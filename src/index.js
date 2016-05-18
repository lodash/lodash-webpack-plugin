import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import { stubs } from './listing';
import { features, overrides } from './mapping';

const rePath = RegExp('/lodash(?:/(?!fp/)|-es/|-amd/)');
const reRequest = RegExp('^lodash(?:/|-es/|-amd/)\\w+$');

function getPatterns(options) {
  const result = [];
  _.forOwn(features, (pairs, key) => {
    if (!options[key]) {
      result.push(...pairs);
    }
  });
  return result;
}

/*----------------------------------------------------------------------------*/

export default class LodashModuleReplacementPlugin {
  constructor(options) {
    this.matches = [];
    this.options = _.assign({}, options);
    this.patterns = getPatterns(this.options);
  }

  apply(compiler) {
    const resolvePath = _.memoize(({ rawRequest, resource }) => {
      let result = resource;
      if (!rePath.test(resource)) {
        return result;
      }
      _.each(this.patterns, pair => {
        // Replace matches as long as they aren't explicit requests for stubbed modules.
        if ((path.basename(resource, '.js') != pair[0]) ||
            (reRequest.test(rawRequest) && _.includes(stubs, pair[1]))) {
          return;
        }
        const modulePath = path.join(path.dirname(resource), `${ pair[1] }.js`);
        if (fs.existsSync(modulePath)) {
          result = modulePath;
          this.matches.push([resource, result]);
          return false;
        }
      });
      return result;
    }, ({ resource }) => resource);

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
