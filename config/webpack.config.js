'use strict';
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var val = require('./var.js');
var filePath = val.filePath;
var js_src = path.resolve(filePath.src, 'javascript');
var js_build = path.resolve(filePath.build, 'javascript');


var webpackConfig = {
  entry: {
  },
  output: {
    path: js_build,
    publicPath: '/javascript/',
    filename: 'pages/[name].[hash].js'
  },
  module: {
    loaders: [
      {
        test: /src(\\|\/).+\.scss$/,
        loader: 'style!css!sass?sourceMap=true'
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
        test: /\.(png|jpg|jpeg)$/,
        loader: 'url-loader?limit=10000&name=../res/[hash:8].[name].[ext]',
      }
    ]
  },
  externals: {
      'react' : 'React',
      'react-dom' : 'ReactDom',
      'react-bootstrap': 'ReactBootstrap'
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
  ]
};

function injectEntry(){
  val.pagesToPath().forEach(function(item){
    webpackConfig.entry[item.name] = item.entry;
  });
}

function injectHtmlWebpack(){
  val.pagesToPath().forEach(function(item){
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
