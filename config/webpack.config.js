'use strict';
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var val = require('./var.js');
var filePath = val.filePath;
var js_src = path.resolve(filePath.src, 'javascript');
var js_assets = path.resolve(filePath.assets, 'javascript');


var webpackConfig = {
  entry: {
  },
  output: {
    path: js_assets,
    publicPath: '/assets/javascript/',
    filename: 'pages/[name].[hash].js'
  },
  module: {
    loaders: [
      {
        test: /src(\\|\/).+\.scss$/,
        loader: 'style!css!sass?sourceMap'
      },
      {
        test: /src(\\|\/).+\.js?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-0','react']
        }
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8192'
      }
    ]
  },
  externals: [
      {
      'react' : 'react',
      'react-dom' : 'react-dom',
      'react-bootstrap': 'react-bootstrap'
      }
  ],
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
  ]
};

function injectEntry(){
  val.pagesToPath.forEach(function(item){
    webpackConfig.entry[item.name] = item.entry;
  });
}

function injectHtmlWebpack(){
  val.pagesToPath.forEach(function(item){
    webpackConfig.plugins.push(
      new HtmlWebpackPlugin({
        filename: item.ftl,
        template: item.templates || item.ftl,
        chunks: [item.name],
        inject: true
      })
    );
  });
}

(function(){
  injectEntry();
  injectHtmlWebpack();
})();

module.exports = webpackConfig;
