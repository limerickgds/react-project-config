
var path = require('path');

var filePath = {
  app: path.resolve(__dirname,'../'),
  assets: path.resolve(__dirname,'../assets'),
  build: path.resolve(__dirname,'../build'),
  config: path.resolve(__dirname),
  node_modules: path.resolve(__dirname, '../node_modules'),
  src: path.resolve(__dirname,'../src'),
  templates: path.resolve(__dirname,'../templates'),
  tpl: path.resolve(__dirname,'../build/tpl'),
  tpl_dev: path.resolve(__dirname,'../assets/tpl')
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
  });
  return _p;
};
module.exports = {
  filePath: filePath,
  pages: pages,
  pagesToPath: pagesToPath
};
