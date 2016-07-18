
var path = require('path');
/**
 * [posts 端口配置]
 */
var posts = {
  puerf: 8888,  //puerf 端口号
  webpackDev: 8010 //webpackDev端口号
};

var filePath = {
  app: path.resolve(__dirname,'../'),
  devbuild: path.resolve(__dirname,'../devbuild'),
  build: path.resolve(__dirname,'../build'),
  config: path.resolve(__dirname),
  node_modules: path.resolve(__dirname, '../node_modules'),
  src: path.resolve(__dirname,'../src'),
  templates: path.resolve(__dirname,'../templates'),
  tpl: path.resolve(__dirname,'../build/tpl'),
  tpl_dev: path.resolve(__dirname,'../devbuild/tpl')
};
var chunks = [];
/**
 * [pages 多页面配置]
 * 配置每个页面的name，入口js，入口ftl
 * @type {Array}
 */
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
/**
 * [pagesToPath 根据pages生成对应的入口文件和输出文件绝对路径]
 * public
 * @param  {[string]} env [开发环境'dev' or 生产环境'build']
 */
var pagesToPath = function(env){
  var _p = [];
  var _env = env || 'build';
  pages.forEach(function(_page){
    var _obj = {
      name: _page.name,
      entry: path.resolve(filePath.src, 'javascript/pages/'+_page.entry),
      ftl: path.resolve(_env === 'build' ? filePath.tpl : filePath.tpl_dev, 'pages/'+_page.ftl),
      templates: path.resolve(filePath.templates, 'pages/'+_page.ftl)
    };
    _p.push(_obj);
    chunks.push(_page.name);
  });
  return _p;
};
module.exports = {
  filePath: filePath,
  pages: pages,
  pagesToPath: pagesToPath,
  posts: posts,
  chunks: chunks
};
