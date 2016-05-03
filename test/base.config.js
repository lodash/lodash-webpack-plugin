import path from 'path';
import webpack from 'webpack';

const basePath = path.resolve(__dirname, '..');

export default {
  'context': basePath,
  'output': {
    'path': basePath,
    'filename': 'bundle.js'
  },
  'module': {
    'loaders': [{
      'loader': 'babel',
      'test': /\.js$/,
      'exclude': /node_modules/,
      'query': {
        'plugins': ['lodash'],
        'presets': ['es2015'],
      }
    }]
  },
  'plugins': [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      'compressor': {
        'pure_getters': true,
        'unsafe': true,
        'warnings': false
      }
    })
  ]
};
