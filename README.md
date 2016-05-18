# lodash-webpack-plugin v0.7.0

Create smaller Lodash builds by replacing [feature sets](#feature-sets) of modules
with [noop](https://lodash.com/docs#noop), [identity](https://lodash.com/docs#identity),
or simpler alternatives.

This plugin complements [babel-plugin-lodash](https://www.npmjs.com/package/babel-plugin-lodash)
by shrinking its cherry-picked builds even further!

## Install

```bash
$ npm i --save lodash
$ npm i --save-dev lodash-webpack-plugin babel-core babel-loader babel-plugin-lodash babel-preset-es2015 webpack
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
    'loaders': [{
      'loader': 'babel',
      'test': /\.js$/,
      'exclude': /node_modules/,
      'query': {
        'plugins': ['lodash'],
        'presets': ['es2015']
      }
    }]
  },
  'plugins': [
    new LodashModuleReplacementPlugin,
    new webpack.optimize.OccurenceOrderPlugin,
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
| `cloning`      | Support for “clone” methods & cloning source objects. |
| `currying`     | Support for “curry” methods. |
| `caching`      | Caches for methods like `_.cloneDeep`, `_.isEqual`, & `_.uniq`. |
| `collections`  | Support for objects in “Collection” methods. |
| `coercions`    | Coercion methods like `_.toInteger`, `_.toNumber`, & `_.toString`. |
| `guards`       | Guards for `arguments` objects, host objects, sparse arrays, & other edge cases. |
| `flattening`   | Support for “flatten” methods & flattening arguments. |
| `paths`        | Deep property path support for methods like `_.get`, `_.has`, & `_.set`. |
| `memoizing`    | Support for `_.memoize` & memoization. |
| `chaining`     | Components to support chain sequences. |
| `metadata`     | Metadata to reduce wrapping of bound, curried, & partially applied functions.<br>_(requires `currying`)_ |
| `placeholders` | Argument placeholder support for “bind”, “curry”, & “partial” methods.<br>_(requires `currying`)_ |
