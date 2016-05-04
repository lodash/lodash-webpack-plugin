import _ from 'lodash';
import path from 'path';
import { features } from './mapping';

const reLodash = RegExp('/lodash(?:-es)?/');

export default class LodashModuleReplacementPlugin {
  constructor(options={}) {
    const replacements = this.replacements = [];
    _.forOwn(features, (pairs, key) => {
      if (!options[key]) {
        _.each(pairs, pair => {
          replacements.push([`/${ pair[0] }.js`, `./${ pair[1] }.js`]);
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
        const { resource } = result;
        if (reLodash.test(resource)) {
          let { length } = replacements;
          while (length--) {
            const pair = replacements[length];
            if (resource.endsWith(pair[0])) {
              result.resource = path.resolve(path.dirname(resource), pair[1]);
              break;
            }
          }
        }
        return callback(null, result);
      });
    });
  }
};
