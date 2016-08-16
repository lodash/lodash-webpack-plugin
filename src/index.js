import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import { stubs } from './listing';
import { features, overrides } from './mapping';

const reFwdSep = /\//g;
const rsSysSep = _.escapeRegExp(path.sep);
const normalize = string => string.replace(reFwdSep, rsSysSep);

const rePath = RegExp(normalize('lodash(?:/(?!fp/)|-es/|-amd/)'));
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
      if (reRequest.test(rawRequest)) {
        // Apply any feature set overrides for explicitly requested modules.
        const override = overrides[path.basename(rawRequest, '.js')];
        if (!_.isMatch(this.options, override)) {
          this.patterns = getPatterns(_.assign(this.options, override));
        }
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
      nmf.plugin('after-resolve', (data, callback) => {
        if (data) {
          data.resource = resolvePath(data);
          return callback(null, data);
        }
        return callback();
      });
    });
  }
};
