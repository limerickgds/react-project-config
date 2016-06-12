var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./config/webpack.server.config.js');

var compiler = webpack(config);

var server = new WebpackDevServer(compiler,{
  publicPath: config.output.publicPath,
  hot: true,
  noInfo: false,
  historyApiFallback: true
}).listen('8010',"localhost",function(err){
});
