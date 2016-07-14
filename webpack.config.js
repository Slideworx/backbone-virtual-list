var path = require('path');
var webpack = require('webpack');
var deps = require('./package.json').dependencies;
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var first = new ExtractTextPlugin('backbone-virtual-list.css');
var second = new ExtractTextPlugin('backbone-virtual-list-custom.css');

module.exports = {
  entry: './index.js',
  output: {
    libraryTarget: 'amd',
    path: path.resolve(__dirname, 'dist'),
    filename: 'backbone-virtual-list.js'
  },
  externals: Object.keys(deps),
  module: {
    loaders: [
      {
        test: /base\.scss$/,
        loader: first.extract('style-loader', 'css-loader!sass-loader')
      },
      {
        test: /custom\.scss$/,
        loader: second.extract('style-loader', 'css-loader!sass-loader')
      }
    ]
  },
  plugins: [
    first,
    second,
    new ExtractTextPlugin('backbone-virtual-list.css'),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
};
