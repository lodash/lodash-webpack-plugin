import path from 'path';
import webpack from 'webpack';

const rootPath = path.resolve(__dirname, '..');

/*----------------------------------------------------------------------------*/

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
      'plugins': ['lodash']
    }
  }]
};

export const resolve = {
  'extensions': ['', '.js'],
  'modulesDirectories': [],
  'root': [
    path.join(rootPath, 'node_modules'),
    path.join(rootPath, 'test/fixtures')
  ]
};

export const plugins = [
  new webpack.optimize.OccurrenceOrderPlugin,
  new webpack.optimize.UglifyJsPlugin
];

export default {
  output,
  module,
  resolve,
  plugins
};
