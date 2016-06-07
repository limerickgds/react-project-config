'use strict';
var path = require('path');

var filePath = {
  app: path.resolve(__dirname,'../'),
  assets: path.resolve(__dirname,'../assets'),
  config: path.resolve(__dirname),
  node_modules: path.resolve(__dirname, '../node_modules'),
  src: path.resolve(__dirname,'../src'),
  templates: path.resolve(__dirname,'../templates'),
  tpl: path.resolve(__dirname,'../tpl')
};
var pages = [
  {
    name: 'index',
    entry: 'index.js',
    ftl: 'index.ftl'
  },{
      name: 'product/index',
      entry: 'product/index.js',
      ftl: 'product/index.ftl'
    }
];
module.exports = {
  filePath: filePath,
  pages: pages
};
