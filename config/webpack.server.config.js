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
    publicPath: 'http://localhost:8010/assets/javascript/',
    filename: '[name].js'
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
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  devtool: 'inline-source-maps'
};

function injectEntry(){
  val.pagesToPath('dev').forEach(function(item){
    webpackConfig.entry[item.name] = [
      'webpack-dev-server/client?http://localhost:8010',
      'webpack/hot/only-dev-server',
      item.entry
    ];
  });
}

function injectHtmlWebpack(){
  val.pagesToPath('dev').forEach(function(item){
    webpackConfig.plugins.push(
      new HtmlWebpackPlugin({
        filename: item.ftl,
        template: item.templates||item.ftl,
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
