import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import { stubs } from './listing';
import { features, overrides } from './mapping';

const reFwdSep = /\//g;
const rsSysSep = _.escapeRegExp(path.sep);
const normalize = string => string.replace(reFwdSep, rsSysSep);

const reLodashRes = RegExp(normalize('lodash(?:/(?!fp/)|-amd/|-es/|\\.\\w+/)'));
const reExplicitReq = RegExp('^lodash(?:/|-amd/|-es/|\\.\\w+/)\\w+$');

const lodashRoot = path.dirname(require.resolve('lodash'));

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

class LodashModuleReplacementPlugin {
  constructor(options) {
    this.matches = [];
    this.options = _.assign({}, options);
    this.patterns = getPatterns(this.options);
  }

  apply(compiler) {
    const resolve = _.memoize(this.resolve.bind(this), ({ resource }) => resource);
    compiler.plugin('normal-module-factory', nmf => {
      nmf.plugin('after-resolve', (data, callback) => {
        if (data) {
          data.resource = resolve(data);
          return callback(null, data);
        }
        return callback();
      });
    });
  }

  resolve({ rawRequest, resource }) {
    let result = resource;
    if (!reLodashRes.test(resource)) {
      return result;
    }
    const isExplicit = reExplicitReq.test(rawRequest);
    const resName = path.basename(resource, '.js');
    const resRoot = path.dirname(resource);

    if (isExplicit) {
      // Apply any feature set overrides for explicitly requested modules.
      const override = overrides[path.basename(rawRequest, '.js')];
      if (!_.isMatch(this.options, override)) {
        this.patterns = getPatterns(_.assign(this.options, override));
      }
    }
    _.each(this.patterns, pair => {
      // Replace matches as long as they aren't explicit requests for stubbed modules.
      const isStubbed = _.includes(stubs, pair[1]);
      if (resName != pair[0] || (isExplicit && isStubbed)) {
        return;
      }
      const moduleFilename = `${ pair[1] }.js`;
      let modulePath = path.join(resRoot, moduleFilename);
      let exists = fs.existsSync(modulePath);

      if (isStubbed && !exists) {
        exists = true;
        modulePath = path.join(lodashRoot, moduleFilename);
      }
      if (exists) {
        result = modulePath;
        this.matches.push([resource, result]);
        return false;
      }
    });
    return result;
  }
};

/*----------------------------------------------------------------------------*/

export default function Plugin(nodeResolve, options) {
  // For Webpack.
  if (this instanceof Plugin) {
    return new LodashModuleReplacementPlugin(nodeResolve);
  }
  // For Rollup.
  const _resolveId = nodeResolve.resolveId;
  const resolver = new LodashModuleReplacementPlugin(options);
  const resolve = _.memoize(resolver.resolve.bind(resolver), ({ resource }) => resource);

  return _.assign(nodeResolve, {
    resolveId(importee, importer) {
      return _resolveId(importee, importer)
        .then(id => resolve({ rawRequest: importee, resource: id }))
     }
   });
};
