/* eslint-env node */

var path = require('path');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var exampleRoot = path.join(__dirname, '..', 'examples', 'iScroll');

var webpackConfig = {
  devtool: '#eval',
  entry: path.join(exampleRoot, 'src', 'index'),
  output: {
    path: path.join(exampleRoot, 'build'),
    filename: 'main.js'
  },
  module: {
    loaders: [{
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('style', ['css-loader', 'postcss-loader', 'sass-loader'])
    }]
  },
  postcss: function() {
    return [autoprefixer];
  },
  plugins: [
    new ExtractTextPlugin('style.css'),
    new HtmlWebpackPlugin({
      template: path.join(exampleRoot, 'src', 'index.html'),
      filename: 'index.html'
    }),
  ],
  stats: {
    children: false, // Avoid "child extract-text-webpack-plugin" spam,
    hash: false,
    version: false,
    colors: true
  }
};
module.exports = webpackConfig;
