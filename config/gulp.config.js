var path       = require('path');
var root       = './';
var src        = './src';
var assets     = './assets';
var cdn        = './r';

var dir_config = {
  sass_src: src + '/sass/**/*.{sass,scss}',
  sass_dest: assets + '/css',
  js_src: src + '/javascript/**/*.{js,jsx}',
  js_dest: assets + '/javascript',
  ftl_src: root + 'templates/**/*.{ftl,html}',
  ftl_dest: root + 'tpl',
  ftl_pages_src: root + 'templates/pages/',
  ftl_pages_dest: root + 'tpl/pages'
};
module.exports = {
  clean: {
    src: [assets, dir_config.ftl_dest,cdn]
  },
  sass: {
    src: dir_config.sass_src,
    dest: dir_config.sass_dest
  },
  htmlreplace: {
    src: dir_config.ftl_pages_src,
    dest: dir_config.ftl_pages_dest
  },
  tplCopy: {
    src: [dir_config.ftl_src,'!'+ dir_config.ftl_pages_src +'**/*.{ftl,html}'],
    dest: dir_config.ftl_dest
  }
};
