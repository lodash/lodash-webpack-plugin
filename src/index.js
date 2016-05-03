import _ from 'lodash';
import path from 'path';
import { features } from './mapping';

export default class LodashReplacementPlugin {
  constructor(options={}) {
    const replacements = this.replacements = [];
    _.forOwn(features, (pairs, key) => {
      if (!options[key]) {
        _.each(pairs, pair => {
          const pattern = RegExp(`\\/lodash(?:-es)?\\/${ pair[0] }\\.js$`);
          replacements.push([pattern, `./${ pair[1] }.js`]);
        });
      }
    });
  }

  apply(compiler) {
    const replacements = this.replacements;
    compiler.plugin('normal-module-factory', nmf => {
      nmf.plugin('after-resolve', (result, callback) => {
        if (!result) {
          return callback();
        }
        let length = replacements.length;
        while (length--) {
          const pair = replacements[length];
          if (pair[0].test(result.resource)) {
            result.resource = path.resolve(path.dirname(result.resource), pair[1]);
            break;
          }
        }
        return callback(null, result);
      });
    });
  }
};
