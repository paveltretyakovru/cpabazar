var path = require('path')
var webpack = require('webpack')
var autoprefixer = require('autoprefixer');
var precss = require('precss');
var WebpackNotifierPlugin = require('webpack-notifier');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:8080/',
    'webpack/hot/dev-server',
    // 'webpack-hot-middleware/client',
    'babel-polyfill',
    './src/index',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/public/',
  },
  plugins: [
    new WebpackNotifierPlugin({title: 'Webpack!', alwaysNotify: true}),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loaders: ['eslint'],
        include: [path.resolve(__dirname, 'src')],
      },
    ],
    loaders: [
      {
        loaders: ['react-hot', 'babel-loader'],
        include: [path.resolve(__dirname, 'src')],
        test: /\.js$/,
        plugins: ['transform-runtime'],
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader',
      },
    ],
  },
  postcss: function () {
    return [autoprefixer, precss];
  },

  devServer: {
    hot: true,
    port: 8080,
    host: 'localhost',
    contentBase: `${__dirname}/public`,
    proxy: { '**': 'http://192.168.16.106:3000' },
  },
}
