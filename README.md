# downgrade-webpack-loader-config

> Downgrade webpack v2 config to v1 loadable

## Install

```
$ npm install -D downgrade-webpack-loader-config
```

## Exmaple

### Usage

```js
const downgrade = require('downgrade-webpack-loader-config')
const webpack2Conf = require('../webpack.config') // webpack v2 config
const loaderConf = downgrade(webpack2Conf.module.rules)

// webpack v1 compatible config
module.exports = {
  module: loaderConf,
}
```

### Input / Output

```js
const downgrade = require('downgrade-webpack-loader-config')

const v2Config = [
  {
    test: /.js?$/,
    use: ['babel-loader'],
    exclude: /node_modules/
  },
  {
    test: /.js?$/,
    enforce: "post",
    use: ['eslint-loader'],
  },
  {
    test: /\.css$/,
    use: [
      { loader: 'style-loader' },
      { loader: 'css-loader', options: { modules: true } },
      { loader: 'postcss-loader' }
    ]
  },
  {
    test: /\.(png|jpeg|svg)$/,
    use: [
      "url-loader"
    ]
  }
]

const output = downgrade(v2Config)

assert.deepEqual(output, {
  loaders: [
    { test: /.js?$/, loader: 'babel-loader' },
    { test: /\.css$/, loader: 'style-loader' },
    { test: /\.css$/,
      loader: 'css-loader',
      query: { modules: true }
    },
    { test: /\.css$/, loader: 'postcss-loader' },
    { test: /\.(png|jpeg|svg)$/, loader: 'url-loader' }
  ],
  "postLoaders": [
    { "test": /.js?$/, "loader": "eslint-loader" }
  ]
})
// => assert OK
```

## References

* https://webpack.js.org/guides/migrating/#module-loaders-is-now-module-rules