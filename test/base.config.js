import path from 'path';
import webpack from 'webpack';

const rootPath = path.resolve(__dirname, '..');

/*----------------------------------------------------------------------------*/

export const output = {
  'path': rootPath,
  'filename': 'bundle.js'
};

export const module = {
  'rules': [{
    'loader': 'babel-loader',
    'test': /\.js$/,
    'exclude': /node_modules/,
    'options': {
      'plugins': ['lodash']
    }
  }]
};

export const resolve = {
  'modules': [
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
