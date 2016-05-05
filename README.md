# lodash-webpack-plugin v0.1.0

Create smaller Lodash builds by replacing feature sets of modules with
[noop](https://lodash.com/docs#noop), [identity](https://lodash.com/docs#identity),
or simpler alternatives.

## Install

```bash
$ npm i --save-dev lodash-webpack-plugin babel-core babel-loader babel-plugin-lodash babel-preset-es2015 webpack
```

## Usage

###### webpack.config.js

```js
var LodashReplacementPlugin = require('lodash-webpack-plugin');
var webpack = require('webpack');

module.exports = {
'module': {
  'loaders': [{
    'loader': 'babel-loader',
    'test': /\.js$/,
    'exclude': '/node_modules/',
    'query': {
      'plugins': ['lodash'],
      'presets': ['es2015']
    }
  }],
  'plugins': [
    new LodashReplacementPlugin,
    new webpack.optimize.OccurenceOrderPlugin,
    new webpack.optimize.UglifyJsPlugin({
      'compressor': {
        'pure_getters': true,
        'unsafe': true,
        'warnings': false
      }
    })
  ]
 }  
};
```

Opt-in to features by passing an options object:
```js
new LodashReplacementPlugin({
  'collections': true,
  'paths': true
})
```

The following features are removed by default _(biggest savings first)_:

| Feature | Description  |
|---|---|
| `shorthands`   | Iteratee shorthands for `_.property`, `_.matches`, & `_.matchesProperty`. |
| `collections`  | Support for objects in “Collection” methods like `_.each`, `_.filter`, & `_.map`. |
| `currying`     | Support for `_.curry` & `_.curryRight`. |
| `caching`      | Caches using `Map` & `Set` for methods like `_.cloneDeep`, `_.isEqual`, & `_.uniq`. |
| `coercions`    | Coercion methods like `_.toInteger`, `_.toNumber`, & `_.toString`. |
| `paths`        | Deep property path support for methods like `_.get`, `_.has`, & `_.set`. |
| `guards`       | Dense array & iteratee call guards for methods like `_.every`, `_.keys`, & `_.some`. |
| `metadata`     | Store metadata to reduce wrapping of bound, curried, & partially applied functions.<br>_(Requires `currying`)_ |
| `placeholders` | Argument placeholder support for methods like `_.bind`, `_.curry`, & `_.partial`.<br>_(Requires `currying`)_ |
