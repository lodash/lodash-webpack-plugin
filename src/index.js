import _ from 'lodash'
import fs from 'fs'
import path from 'path'
import { stubs } from './listing'
import { features, overrides } from './mapping'

const lodashRoot = path.dirname(require.resolve('lodash'))
const normalize = (string) => string.replace(reFwdSep, rsSysSep)

const reFwdSep = /\//g
const rsSysSep = _.escapeRegExp(path.sep)
const reLodashRes = RegExp(normalize('lodash(?:/(?!fp/)|-amd/|-es/|\\.\\w+/)'))
const reExplicitReq = RegExp('^lodash(?:/|-amd/|-es/|\\.\\w+/)\\w+$')

function getPatterns(options) {
  const result = []
  _.forOwn(features, (pairs, key) => {
    if (!options[key]) {
      result.push(...pairs)
    }
  })
  return result
}

/*----------------------------------------------------------------------------*/

class LodashModuleReplacementPlugin {
  constructor(options) {
    this.matches = []
    this.options = Object.assign({}, options)
    this.patterns = getPatterns(this.options)
    this.resolve = this.resolve.bind(this)
  }

  apply(compiler) {
    const resolve = _.memoize(this.resolve, ({ resource }) => resource)

    /* Webpack >= 4 */
    if (compiler.hooks) {
      // Webpack 5.1.0 adds the `compiler.webpack` property.
      const isWebpack5 = !!compiler.webpack

      compiler.hooks.normalModuleFactory.tap('LodashModuleReplacementPlugin', (nmf) => {
        nmf.hooks.afterResolve.tap('LodashModuleReplacementPlugin', (data) => {
          if (data) {
            if (isWebpack5) {
              data.createData.resource = resolve(data.createData)
            } else {
              data.resource = resolve(data)
            }
          }

          if (!isWebpack5) {
            return data
          }
        })
      })
    } else {
      compiler.plugin('normal-module-factory', (nmf) => {
        nmf.plugin('after-resolve', (data, callback) => {
          if (data) {
            data.resource = resolve(data)
            return callback(null, data)
          }
          return callback()
        })
      })
    }
  }

  resolve({ rawRequest, resource }) {
    let result = resource
    if (!reLodashRes.test(resource)) {
      return result
    }
    const isExplicit = reExplicitReq.test(rawRequest)
    const resName = path.basename(resource, '.js')
    const resRoot = path.dirname(resource)

    if (isExplicit) {
      // Apply any feature set overrides for explicitly requested modules.
      const override = overrides[path.basename(rawRequest, '.js')]
      if (!_.isMatch(this.options, override)) {
        this.patterns = getPatterns(Object.assign(this.options, override))
      }
    }
    this.patterns.forEach((pair) => {
      // Replace matches as long as they aren't explicit requests for stubbed modules.
      const isStubbed = _.includes(stubs, pair[1])
      if (resName != pair[0] || (isExplicit && isStubbed)) {
        return
      }
      const moduleFilename = `${pair[1]}.js`
      let modulePath = path.join(resRoot, moduleFilename)
      let exists = fs.existsSync(modulePath)

      if (isStubbed && !exists) {
        exists = true
        modulePath = path.join(lodashRoot, moduleFilename)
      }
      if (exists) {
        result = modulePath
        this.matches.push([resource, result])
        return false
      }
    })
    return result
  }
};

/*----------------------------------------------------------------------------*/

export default function Plugin(nodeResolve, options) {
  // For Webpack.
  if (this instanceof Plugin) {
    return new LodashModuleReplacementPlugin(nodeResolve)
  }
  // For Rollup.
  const _resolveId = nodeResolve.resolveId
  const resolver = new LodashModuleReplacementPlugin(options)
  const resolve = _.memoize(resolver.resolve, ({ resource }) => resource)

  return Object.assign({}, nodeResolve, {
    resolveId(importee, importer) {
      return _resolveId(importee, importer)
        .then((id) => resolve({ 'rawRequest': importee, 'resource': id }))
    }
  })
};
