var path = require('path');
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var eventStream = require('event-stream');
var runSequence = require('run-sequence');
var config = require('./config/gulp.config.js');
var val = require('./config/var.js');
var puerfConfig = require('./config/puerf/puerf.config.js');
var os = require('os');
var child_process = require('child_process');
var rimraf = require('rimraf');


var _PLATFORM = os.platform();

/**
 * [task serve]
 * development environment
 */
gulp.task('serve',function(cb){
  runSequence(
    'clean:dev',
    'tpl:copy:dev',
    'tplreplace',
    'js:serve',
    'puerf',
    'watch',
    cb);
});

gulp.task('build', function(cb){
  runSequence(
    'clean',
    'tpl:copy',
    cb);
});

gulp.task('clean',function(cb){
  rimraf(config.del.build,{},cb);
});

gulp.task('clean:dev',function(cb){
  rimraf(config.del.dev,{},cb);
});

gulp.task('watch', function(){
  gulp.watch(config.watch.templates,['tplreplace']);
});

/**
 * [task puerf]
 * use puerf to render freemarker templates
 */
gulp.task('puerf', function() {
  var puerf = require('puer-freemarker');
    puerf.start(puerfConfig);
});
/**
 * [task js:serve]
 * use child_process to launch a server with webpack-dev-server
 */
gulp.task('js:serve',function(){

  return child_process.spawn('node',['server.js'],{ stdio: 'inherit'});
});

/**
 * [task tpl:copy]
 * copy templates to tpl without pages
 */
gulp.task('tpl:copy:dev',function(){
  var _config = config.tplCopy.dev;
  return gulp.src(_config.src)
        .pipe(gulp.dest(_config.dest));
});

/**
 * [task tpl:copy]
 * copy templates to tpl without pages
 */
gulp.task('tpl:copy',function(){
  var _config = config.tplCopy.build;
  return gulp.src(_config.src)
        .pipe(gulp.dest(_config.dest));
});

/**
 * [task tplreplace]
 * insert script tag into html,
 * changed this script src  to 'http://localhost:8010/devbuild*'
 */
gulp.task('tplreplace',function(cb){
  var _config = config.tplreplace,
      _platform = os.platform;
      console.log(_config);
  var tasks = val.pagesToPath('dev').map(function(page){
    var _dest = page.ftl.slice(0,page.ftl.lastIndexOf(_PLATFORM === 'win32' ? '\\': '/'));
    return gulp.src(page.templates)
      .pipe($.htmlReplace({
        'js': {
          src: _config.options.pre + page.name,
          tpl:'<script src="%s.js"></script>'
        }
      }))
      .pipe(gulp.dest(_dest))
      .on('error', $.util.log);
   });
   eventStream.merge(tasks).on('end', cb);
});
