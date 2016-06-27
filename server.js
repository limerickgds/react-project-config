var webpack = require('webpack');
var val = require('./config/var.js');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./config/webpack.server.config.js');

var compiler = webpack(config);

var server = new WebpackDevServer(compiler,{
  publicPath: config.output.publicPath,
  hot: true,
  noInfo: false,
  historyApiFallback: true
}).listen(val.post.webpackDev,"localhost",function(err){
});
