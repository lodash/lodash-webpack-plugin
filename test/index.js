import _ from 'lodash';
import assert from 'assert';
import baseConfig from './base.config.js';
import fs from 'fs';
import glob from 'glob';
import { sync as gzipSize } from 'gzip-size';
import MemoryFS from 'memory-fs';
import path from 'path';
import plugin from '../src/index';
import prettyBytes from 'pretty-bytes';
import webpack from 'webpack';

const memFS = new MemoryFS;

function createConfig(configPath, entryPath) {
  return merge({ 'entry': entryPath }, require(configPath).default, baseConfig);
}

const merge = _.partialRight(_.mergeWith, (value, other) => {
  if (_.isArray(value) && _.isArray(other)) {
    return value.concat(other);
  }
});

describe('Lodash modularized builds', function() {
  this.timeout(0);

  _.each(glob.sync(path.join(__dirname, 'fixtures/*/')), testPath => {
    const testName = _.lowerCase(path.basename(testPath));
    const actualPath = path.join(testPath, 'actual.js');
    const configPath = path.join(testPath, 'config.js');

    it(`should work with ${ testName }`, done => {
      const config = createConfig(configPath, actualPath);
      const compiler = webpack(config);
      const outputPath = path.join(config.output.path, config.output.filename);

      compiler.outputFileSystem = memFS;
      compiler.run(function(err, stats) {
        const modules = stats.toJson().modules;
        const output = memFS.readFileSync(outputPath, 'utf8');
        const size = prettyBytes(gzipSize(output));

        assert.ok(modules.length < 50);
        done(err);
      });
    });
  });
});
