import path from 'path';
import webpack from 'webpack';

const rootPath = path.resolve(__dirname, '..');

export const output = {
  'path': rootPath,
  'filename': 'bundle.js'
};

export const module = {
  'loaders': [{
    'loader': 'babel',
    'test': /\.js$/,
    'exclude': /node_modules/,
    'query': {
      'plugins': ['lodash'],
      'presets': ['es2015']
    }
  }]
};

export const plugins = [
  new webpack.optimize.OccurenceOrderPlugin,
  new webpack.optimize.UglifyJsPlugin({
    'compressor': {
      'pure_getters': true,
      'unsafe': true,
      'warnings': false
    }
  })
];

export const resolve = {
  'extensions': ['', '.js'],
  'modulesDirectories': [],
  'root': [
    path.join(rootPath, 'test/fixtures'),
    path.join(rootPath, 'node_modules')
  ]
};

export default {
  output,
  module,
  plugins,
  resolve
};
