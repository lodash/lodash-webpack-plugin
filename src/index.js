import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import { features } from './mapping';

const reLodashPath = RegExp('/lodash(?:/(?!fp/)|-es/|-amd/)');
const reLodashRaw = RegExp('^lodash(?:/|-es/|-amd/)\\w+$');

const stubs = [
  './identity.js',
  './noop.js',
  './stubArray.js',
  './stubFalse.js',
  './stubObject.js',
  './stubString.js',
  './stubTrue.js'
];

export default class LodashModuleReplacementPlugin {
  constructor(options) {
    options || (options = {});
    this.matches = [];
    this.patterns = [];

    _.forOwn(features, (pairs, key) => {
      if (!options[key]) {
        _.each(pairs, pair => {
          this.patterns.push([`/${ pair[0] }.js`, `./${ pair[1] }.js`]);
        });
      }
    });
  }

  apply(compiler) {
    const resolvePath = _.memoize(data => {
      const { rawRequest, resource } = data;
      if (reLodashPath.test(resource)) {
        let { length } = this.patterns;
        while (length--) {
          const pair = this.patterns[length];
          // Replace the resource if it end swith the first pattern of the pair as
          // long as it isn't an explicit request for a module which is to be stubbed.
          if (_.endsWith(resource, pair[0]) &&
              !(reLodashRaw.test(rawRequest) && _.includes(stubs, pair[1]))) {
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
