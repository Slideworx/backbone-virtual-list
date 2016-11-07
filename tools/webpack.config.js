/* eslint-env node */

var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var dependencies = require('../package.json').dependencies;

var isProduction = process.argv.indexOf('-p') > -1;

var webpackConfig = {
  entry: path.join(__dirname, '..', 'src', 'index'),
  output: {
    libraryTarget: 'amd',
    path: path.join(__dirname, '..', 'dist'),
    filename: 'backbone-virtual-list' + (isProduction ? '.min' : '') + '.js'
  },
  module: {
    loaders: [{
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('style', ['css-loader', 'postcss-loader', 'sass-loader'])
    }]
  },
  externals: Object.keys(dependencies),
  postcss: function() {
    return [autoprefixer];
  },
  plugins: [new ExtractTextPlugin('backbone-virtual-list' + (isProduction ? '.min' : '') + '.css')],
  stats: {
    children: false, // Avoid "child extract-text-webpack-plugin" spam,
    hash: false,
    version: false,
    colors: true
  }
};

if (!isProduction) {
  webpackConfig.devtool = '#eval';
} else {
  webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }));
}

module.exports = webpackConfig;
