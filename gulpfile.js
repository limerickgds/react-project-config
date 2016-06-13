var path = require('path');
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var eventStream = require('event-stream');
var runSequence = require('run-sequence');
var config = require('./config/gulp.config.js');
var val = require('./config/var.js');
var puerfConfig = require('./config/puerf.config.js');
var os = require('os');
var child_process = require('child_process');


var _PLATFORM = os.platform();

/**
 * [task serve]
 * development environment
 */
gulp.task('serve',function(cb){
  runSequence(
   'tpl:copy',
    'watch',
    'js:serve',
    'puerf',
    cb);
});

/**
 * [task build]
 * product environment
 */
gulp.task('build',function(cb){
  runSequence(
    'tpl:copy',
    cb);
});

gulp.task('watch', function(){
  gulp.watch(config.watch.templates,['htmlreplace']);
});

/**
 * [task puerf]
 * use puerf to render freemarker templates
 */
gulp.task('puerf', function() {
  var puerf = require('puer-freemarker');
    puerf.start(puerfConfig);
});

gulp.task('js:serve',function(){

  return child_process.spawn('node',['server.js'],{ stdio: 'inherit'});
});

/**
 * [task tpl:copy]
 * copy templates to tpl without pages
 */
gulp.task('tpl:copy',function(){
  var _config = config.tplCopy;
  return gulp.src(_config.src)
        .pipe(gulp.dest(_config.dest));
});

/**
 * [task htmlreplace]
 * insert script into html
 */
gulp.task('htmlreplace',function(cb){
  var _config = config.htmlreplace,
      _platform = os.platform;
  var tasks = val.pagesToPath.map(function(page){
    var _dest = page.ftl.slice(0,page.ftl.lastIndexOf(_PLATFORM === 'win32' ? '\\': '/'));
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
   eventStream.merge(tasks).on('end', cb);
});
