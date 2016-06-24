var val = require('./var.js');
module.exports = {
  routes: ['config/mockRoutes.config.js','config/ftlRoutes.config.js'],

  templates: 'tpl/',

  root: val.filePath.app.assets,

  port: 8888,

  wath: 'html|xhtml|ftl'
};
