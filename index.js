'use strict';

var _ = require('lodash'),
    path = require('path'),
    mapping = require('./mapping');

function LodashReplacementPlugin(options) {
  options || (options = {});
  var replacements = this.replacements = [];
  _.forOwn(mapping.features, function(pairs, key) {
    if (!options[key]) {
      var pattern = RegExp('\\blodash(?:-es)?\\/' + pairs[0] + '\\.js$');
      replacements.push([pattern, './' + pairs[1] + '.js']);
    }
  });
}

LodashReplacementPlugin.prototype.apply = function(compiler) {
  var replacements = this.replacements;
  compiler.plugin('normal-module-factory', function(nmf) {
    nmf.plugin('after-resolve', function(result, callback) {
      if (!result) {
        return callback();
      }
      var length = replacements.length;
      while (length--) {
        var pair = replacements[length];
        if (pair[0].test(result.resource)) {
          result.resource = path.resolve(path.dirname(result.resource), pair[1]);
          break;
        }
      }
      return callback(null, result);
    });
  });
};

module.exports = LodashReplacementPlugin;
