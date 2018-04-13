# lodash-webpack-plugin

Create smaller Lodash builds by replacing [feature sets](#feature-sets) of modules
with [noop](https://lodash.com/docs#noop), [identity](https://lodash.com/docs#identity),
or simpler alternatives.

This plugin complements [babel-plugin-lodash](https://www.npmjs.com/package/babel-plugin-lodash)
by shrinking its cherry-picked builds even further!

## Install

```shell
$ npm i --save lodash
$ npm i --save-dev lodash-webpack-plugin babel-core babel-loader babel-plugin-lodash babel-preset-env webpack
```

## Example

![demo](https://cloud.githubusercontent.com/assets/4303/15064867/2c5420b0-130e-11e6-8293-5037d359851f.gif)

## Usage

###### webpack.config.js
```js
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
var webpack = require('webpack');

module.exports = {
  'module': {
    'rules': [{
      'use': 'babel-loader',
      'test': /\.js$/,
      'exclude': /node_modules/,
      'options': {
        'plugins': ['lodash'],
        'presets': [['env', { 'modules': false, 'targets': { 'node': 4 } }]]
      }
    }]
  },
  'plugins': [
    new LodashModuleReplacementPlugin,
    new webpack.optimize.UglifyJsPlugin
  ]
};
```

Opt-in to features with an options object:
```js
new LodashModuleReplacementPlugin({
  'collections': true,
  'paths': true
});
```

## Feature Sets

The following features are removed by default _(biggest savings first)_:

| Feature | Description |
|:---|:---|
| `shorthands`   | Iteratee shorthands for `_.property`, `_.matches`, & `_.matchesProperty`. |
| `cloning`      | Support “clone” methods & cloning source objects. |
| `currying`     | Support “curry” methods. |
| `caching`      | Caches for methods like `_.cloneDeep`, `_.isEqual`, & `_.uniq`. |
| `collections`  | Support objects in “Collection” methods. |
| `exotics`      | Support objects like buffers, maps, sets, symbols, typed arrays, etc. |
| `guards`       | Guards for host objects, sparse arrays, & other edge cases. |
| `metadata`     | Metadata to reduce wrapping of bound, curried, & partially applied functions.<br>_(requires `currying`)_ |
| `deburring`    | Support deburring letters. |
| `unicode`      | Support Unicode symbols. |
| `chaining`     | Components to support chain sequences. |
| `memoizing`    | Support `_.memoize` & memoization. |
| `coercions`    | Support for coercing values to integers, numbers, & strings. |
| `flattening`   | Support “flatten” methods & flattening rest arguments. |
| `paths`        | Deep property path support for methods like `_.get`, `_.has`, & `_.set`. |
| `placeholders` | Argument placeholder support for “bind”, “curry”, & “partial” methods.<br>_(requires `currying`)_ |
