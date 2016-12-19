# degrade-webpack-loader-config

> degrade webpack v2 config to v1 loadable

## Exmaple

### Usage

```js
const degrade = require('degrade-webpack-loader-config')
const webpack2Conf = require('../webpack.config')
const loaderConf = degrade(webpack2Conf.module.rules)

// webpack v1 compatible config
module.exports = {
  module: loaderConf,
}
```

### Input / Output

```js
const degrade = require('degrade-webpack-loader-config')

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

const output = degrade(v2Config)

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

