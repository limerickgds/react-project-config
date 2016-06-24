var path       = require('path');
var root       = './';
var src        = './src';
var assets     = './assets';
var build      = './build';
var cdn        = './r';

var dir_config = {
  sass_src: src + '/sass/**/*.{sass,scss}',
  sass_dest: build + '/css',
  ftl_src: root + 'templates/**/*.{ftl,html}',
  ftl_dest: build + '/tpl',
  ftl_dest_dev: assets + '/tpl',
  ftl_pages_src: root + 'templates/pages/',
  ftl_pages_dest_dev: assets + '/tpl/pages'
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
    dest: dir_config.ftl_pages_dest_dev
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
  },
  usemin: {
    src: [dir_config.ftl_src,'!'+ dir_config.ftl_pages_src +'**/*.{ftl,html}'],
    dest: dir_config.ftl_dest,
    sass_base: src+'/sass',
    options: {
        assetsDir: '',  // 根搜索目录
        path: './',     //相对于templates的css,js搜索目录
        outputRelativePath: '../'  //相对于tpl的输出目录
      }
  }
};
