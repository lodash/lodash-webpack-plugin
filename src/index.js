import _ from 'lodash';
import path from 'path';
import { features } from './mapping';

const reLodash = RegExp('/lodash(?:-amd|-es)?/');

export default class LodashModuleReplacementPlugin {
  constructor(options) {
    options || (options = {});
    this.replacements = [];
    _.forOwn(features, (pairs, key) => {
      if (!options[key]) {
        _.each(pairs, pair => {
          this.replacements.push([`/${ pair[0] }.js`, `./${ pair[1] }.js`]);
        });
      }
    });
  }

  apply(compiler) {
    const resolvePath = _.memoize(resource => {
      if (reLodash.test(resource)) {
        let { length } = this.replacements;
        while (length--) {
          const pair = this.replacements[length];
          if (_.endsWith(resource, pair[0])) {
            return path.resolve(path.dirname(resource), pair[1]);
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
