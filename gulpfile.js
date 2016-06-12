var path = require('path');
var gulp = require('gulp');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var $ = require('gulp-load-plugins')();
var runSequence = require('run-sequence');
var config = require('./config/gulp.config.js');
var val = require('./config/var.js');
var webpackConfig = require('./config/webpack.config.js');
var webpackServerConfig = require('./config/webpack.server.config.js');
var puerfConfig = require('./config/puerf.config.js');

//test
var through = require('through2');


gulp.task('serve',function(cb){
  runSequence(
    'htmlreplace',
    'tpl:copy',
    'puerf',
    cb);
});

gulp.task('build',function(cb){
  runSequence(
    'tpl:copy',
    cb);
});


gulp.task('puerf', function() {
  var puerf = require('puer-freemarker');
    puerf.start(puerfConfig);
});

gulp.task('tpl:copy',function(){
  var _config = config.tplCopy;
  return gulp.src(_config.src)
        .pipe(gulp.dest(_config.dest));
});

gulp.task('webpack', function(cb){
  webpack(webpackConfig,function(err,stats){
    console.log(stats);
  });
});

gulp.task('htmlreplace',function(cb){
  var _config = config.htmlreplace;
  var tasks = val.pagesToPath.forEach(function(page){
    var _dest = page.ftl.slice(0,page.ftl.lastIndexOf('/'));
    return gulp.src(page.templates)
      .pipe($.htmlReplace({
        'js': {
          src: 'http://localhost:8010/assets/javascript/pages/'+ page.name,
          tpl:'<script src="%s.js"></script>'
        }
      }))
      .pipe(gulp.dest(_dest))
      .on('error', $.util.log);
   });
  cb();
});
