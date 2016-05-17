import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import { features, overrides } from './mapping';

const rePath = RegExp('/lodash(?:/(?!fp/)|-es/|-amd/)');
const reRequest = RegExp('^lodash(?:/|-es/|-amd/)\\w+$');

const stubs = [
  './identity.js',
  './noop.js',
  './stubArray.js',
  './stubFalse.js',
  './stubObject.js',
  './stubString.js',
  './stubTrue.js'
];

function getPatterns(options) {
  const result = [];
  _.forOwn(features, (pairs, key) => {
    if (!options[key]) {
      _.each(pairs, pair => {
        result.push([`/${ pair[0] }.js`, `./${ pair[1] }.js`]);
      });
    }
  });
  return result;
}

/*----------------------------------------------------------------------------*/

export default class LodashModuleReplacementPlugin {
  constructor(options) {
    this.matches = [];
    this.options = options || {};
    this.patterns = getPatterns(this.options);
  }

  apply(compiler) {
    const resolvePath = _.memoize(data => {
      const { rawRequest, resource } = data;
      if (rePath.test(resource)) {
        let { length } = this.patterns;
        while (length--) {
          const pair = this.patterns[length];
          // Replace the resource if it ends with the first pattern of the pair as
          // long as it isn't an explicit request for a module which is to be stubbed.
          if (_.endsWith(resource, pair[0]) &&
              !(reRequest.test(rawRequest) && _.includes(stubs, pair[1]))) {
            const result = path.resolve(path.dirname(resource), pair[1]);
            if (fs.existsSync(result)) {
              this.matches.push([resource, result]);
              return result;
            }
          }
        }
      }
      return resource;
    }, data => data.resource);

    compiler.plugin('normal-module-factory', nmf => {
      nmf.plugin('before-resolve', (data, callback) => {
        if (!data) {
          return callback();
        }
        const { request } = data;
        if (reRequest.test(request)) {
          const override = overrides[path.basename(request, '.js')];
          if (!_.isMatch(this.options, override)) {
            this.patterns = getPatterns(_.assign(this.options, override));
          }
        }
        return callback(null, data);
      });

      nmf.plugin('after-resolve', (data, callback) => {
        if (!data) {
          return callback();
        }
        data.resource = resolvePath(data);
        return callback(null, data);
      });
    });
  }
};
