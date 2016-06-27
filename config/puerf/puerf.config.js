var val = require('../var.js');
var _routes  = [];
val.pages.forEach(function(p){
  _routes.push('config/puerf/mock/' + p.name + '.config.js');
});
module.exports = {
  routes: _routes,

  templates: 'devbuild/tpl/',

  root: val.filePath.app.devbuild,

  port: val.posts.puerf,

  wath: 'html|xhtml|ftl'
};
