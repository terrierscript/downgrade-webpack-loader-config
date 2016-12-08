# degrate-webpack-loader-config

> degrate webpack v2 config to v1 loadable

## Usage Exmaple

```js

const degrate = require('degrate-webpack-loader-config')

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
const output = degrate(v2Config)
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
```