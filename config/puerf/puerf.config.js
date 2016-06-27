var val = require('../var.js');
var _routes  = [];
val.pages.forEach(function(p){
  _routes.push('config/puerf/mock/' + p.name + '.config.js');
});
console.log(_routes)
module.exports = {
  routes: _routes,

  templates: 'assets/tpl/',

  root: val.filePath.app.assets,

  port: val.posts.puerf,

  wath: 'html|xhtml|ftl'
};
