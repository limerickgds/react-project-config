var path = require('path');
var glob = require('glob');
var eventStream = require('event-stream');
var rimraf= require('rimraf');
var gulp = require('gulp');
var webpack = require('webpack');
var $ = require('gulp-load-plugins')();
var runSequence = require('run-sequence');
var config = require('./config/gulp.config.js');
var webpackConfig = require('./config/webpack.config.js');
var puerfConfig = require('./config/puerf.config.js');

//test
var through = require('through2');


gulp.task('serve',function(cb){
  runSequence(
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

gulp.task('sass',function(){
  var _config = config.sass;
  return gulp.src(_config.src)
      .pipe($.sourcemaps.init())
      .pipe($.sass())
      .pipe($.sourcemaps.write('.'))
      .pipe(gulp.dest(_config.dest));
});
gulp.task('usemin',function(cb){

});
gulp.task('babel',function(){
  var _config = config.babel;
  return gulp.src(_config.src)
      .pipe($.sourcemaps.init())
      .pipe($.babel({
        presets: ["es2015","stage-0","react"]
      }))
      .pipe($.sourcemaps.write('.'))
      .pipe(gulp.dest(_config.dest));
});

gulp.task('tpl:copy',function(){
  var _config = config.tplCopy;
  return gulp.src(_config.src)
        .pipe(gulp.dest(_config.dest));
});
