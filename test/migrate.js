
const confV1 = {
  preLoaders: [
    {
      test: /.js?$/,
      loaders: ['eslint-loader'],
      exclude: /node_modules/
    },
  ],
  loaders: [
    {
      test: /.js?$/,
      loaders: ['babel-loader', 'eslint-loader'],
      exclude: /node_modules/
    },
    {
      test: /\.css$/,
      loader: 'style-loader'
    },
    {
      test: /\.css$/,
      loader: 'css-loader',
      query: {
        modules: true,
        localIdentName: '[name]_[local]_[hash:base64:5]'
      }
    },
    {
      test: /\.css$/,
      loader: 'postcss-loader'
    },
    { test: /\.(png|jpeg|svg)$/, loader: "url-loader" },
  ]
}