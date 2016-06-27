var path       = require('path');
var val        = require('./var.js');
var root       = './';
var src        = './src';
var devbuild     = './devbuild';
var build      = './build';
var cdn        = './r';

var dir_config = {
  sass_src: src + '/sass/**/*.{sass,scss}',
  sass_dest: build + '/css',
  ftl_src: root + 'templates/**/*.{ftl,html}',
  ftl_dest: build + '/tpl',
  ftl_dest_dev: devbuild + '/tpl',
  ftl_pages_src: root + 'templates/pages/',
  ftl_pages_dest_dev: devbuild + '/tpl/pages'
};
module.exports = {
  clean: {
    src: [build]
  },
  sass: {
    src: dir_config.sass_src,
    dest: dir_config.sass_dest
  },
  watch:{
    templates: dir_config.ftl_src
  },
  tplreplace: {
    src: dir_config.ftl_pages_src,
    dest: dir_config.ftl_pages_dest_dev,
    options:{
      pre: 'http://localhost:'+ val.posts.webpackDev + '/devbuild/javascript/'
    }
  },
  tplCopy: {
    dev:{
      src: [dir_config.ftl_src,'!'+ dir_config.ftl_pages_src +'**/*.{ftl,html}'],
      dest: dir_config.ftl_dest_dev
    },
    build:{
      src: [dir_config.ftl_src,'!'+ dir_config.ftl_pages_src +'**/*.{ftl,html}'],
      dest: dir_config.ftl_dest
    }
  }
};
