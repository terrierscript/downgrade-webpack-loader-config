const assert = require('assert')
const degrate = require('../degrate')
const migrate = require('../migrate')
const util = require('util')
describe('', () => {
  const confV2 = [
    {
      test: /.js?$/,
      use: ['babel-loader', 'eslint-loader'],
      exclude: /node_modules/
    },
    {
      // css読み込み。create-react-appを参考にした
      test: /\.css$/,
      use: [
        { loader: 'style-loader' },
        {
          loader: 'css-loader',
          options: {
            modules: true,
            localIdentName: '[name]_[local]_[hash:base64:5]'
          }
        },
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
  // it('1 -> 2', () => {
  //   const output = migrate(confV1)
  //   assert.deepEqual(output, confV2)
  // })
  it('2 -> 1', () => {
    const output = degrate(confV2)
    assert.deepEqual(output, {
      loaders: [
        { test: /.js?$/, loader: 'babel-loader' },
        { test: /.js?$/, loader: 'eslint-loader' },
        { test: /\.css$/, loader: 'style-loader' },
        { test: /\.css$/,
          loader: 'css-loader',
          query:
           { modules: true,
             localIdentName: '[name]_[local]_[hash:base64:5]' } },
        { test: /\.css$/, loader: 'postcss-loader' },
        { test: /\.(png|jpeg|svg)$/, loader: 'url-loader' }
      ]
    })
  })

  it('pre, post', () => {
    const output = degrate([{
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
    console.log(output)
  })
})