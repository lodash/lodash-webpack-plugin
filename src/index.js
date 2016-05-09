import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import { features } from './mapping';

const reLodash = RegExp('/lodash(?:/(?!fp/)|-es/|-amd/)');

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
    const resolvePath = _.memoize(resource => {
      if (reLodash.test(resource)) {
        let { length } = this.patterns;
        while (length--) {
          const pair = this.patterns[length];
          if (_.endsWith(resource, pair[0])) {
            const result = path.resolve(path.dirname(resource), pair[1]);
            if (fs.existsSync(result)) {
              this.matches.push([resource, result]);
              return result;
            }
          }
        }
      }
      return resource;
    });

    compiler.plugin('normal-module-factory', nmf => {
      nmf.plugin('after-resolve', (result, callback) => {
        if (!result) {
          return callback();
        }
        result.resource = resolvePath(result.resource);
        return callback(null, result);
      });
    });
  }
};
