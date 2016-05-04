import path from 'path';
import webpack from 'webpack';

export const output = {
  'path': path.resolve(__dirname, '..'),
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

export default {
  output,
  module,
  plugins
};
