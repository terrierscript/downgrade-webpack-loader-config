const assert = require('assert')
const degrade = require('../degrade')
const util = require('util')
describe('degrade v2 to v1', () => {
  it('2 -> 1', () => {
    const confV2 = [
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
    const output = degrade(confV2)
    assert.deepEqual(output, {
      loaders: [
        { test: /.js?$/, loader: 'babel-loader', exclude: /node_modules/},
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
  })

  it('pre, post', () => {
    const output = degrade([{
      test: /.js?$/,
      use: ['eslint-loader'],
      exclude: /node_modules/
    }, {
      test: /.js?$/,
      enforce: "post",
      use: ['eslint-loader'],
    }, {
      test: /.js?$/,
      enforce: "pre",
      use: ['eslint-loader'],
    }])
    assert.deepEqual(output, {
      preLoaders: [ { test: /.js?$/, loader: 'eslint-loader' } ],
      loaders: [ { test: /.js?$/, loader: 'eslint-loader' } ],
      postLoaders: [ { test: /.js?$/, loader: 'eslint-loader' } ]
    })
  })

  it.skip('merge configs', () => {
    const confV2 = [
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' }
        ]
      },
    ]
    const output = degrade(confV2)
    console.log(output)
  })
})