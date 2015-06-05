/* 
* @Author: vokoshyv
* @Date:   2015-05-26 17:12:39
* @Last Modified by:   vokoshyv
* @Last Modified time: 2015-06-05 16:36:18
*/

'use strict';

// require gulp plugins
var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    livereload = require('gulp-livereload'),
    open = require('gulp-open'),
    shell = require('gulp-shell'),
    stylish = require('jshint-stylish'),

    // required dependencies for compressing React files
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    reactify = require('reactify'),

    // for cleaning out files
    del = require('del'),

    // for delaying a pipe stream
    wait = require('gulp-wait'),

    // to implement consistent styling
    jscs = require('gulp-jscs'),
    notify = require('gulp-notify'),
    growl = require('gulp-notify-growl');

// set up paths 
var paths = {
  scripts: ['server/public/javascripts/*.js','server/public/javascripts/**/*.js'],
  server: 'server/*.js', 
  styles: 'server/public/stylesheets/*.css',
  billRoute: 'server/api/bill/*.js', 
  html: 'server/public/index.html'
}

gulp.task('browserify', function() {
  var b = browserify();
  b.transform(reactify);
  b.add('server/public/javascripts/main.js');
  return b.bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('server/public/dist/'))
});

gulp.task('scripts', function(){
  return gulp.src(
    paths.scripts
  )
  .pipe(jshint())
  .pipe(jshint.reporter(stylish))
  .pipe(wait(4000))
  .pipe(livereload());
});

gulp.task('server', function(){
  return gulp.src([
    paths.server
  ])
  .pipe(jshint())
  .pipe(jshint.reporter(stylish));
});

gulp.task('styles', function(){
  return gulp.src([
    paths.styles
  ])
  .pipe(livereload());
});

gulp.task('billRoute', function(){
  return gulp.src([
    paths.billRoute
  ])
  .pipe(jshint())
  .pipe(jshint.reporter(stylish))
  .pipe(livereload());
});

gulp.task('html', function(){
  return gulp.src([
    paths.html
  ])
  .pipe(livereload());
});

gulp.task('startServer', shell.task([
  //'redis-server', 
  'nodemon server/app.js'
]));

gulp.task('test', shell.task([
  'npm test'
]));

gulp.task('openInBrowser', function(){
  var options = {
    url: 'http://localhost:3000'
  };
  setTimeout(function(){
    gulp.src('./server/public/index.html')
    .pipe(open('', options));
  }, 7000)
});

gulp.task('clearDist', function(cb){
  del([
    'server/public/dist/bundle.js'
    ], cb)
});

gulp.task('watch', function(){
  console.log('reached here');
  livereload.listen();

  gulp.watch(paths.server, ['server']);
  gulp.watch(paths.styles, ['styles']);
  gulp.watch(paths.billRoute, ['billRoute']);
  gulp.watch(paths.html, ['html']);
  gulp.watch(paths.scripts, ['clearDist', 'browserify', 'scripts']);

})

gulp.task('default', ['clearDist', 'browserify', 'watch', 'startServer', 'openInBrowser']);

gulp.task('lint', function() {
  return gulp.src(paths.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});

var growlNotifier = growl();

gulp.task('style', function() {
    gulp.src('testing/*.js')
        .pipe(jscs({preset: 'google'}))
        .pipe(jscs({fix: true}))
        .pipe(notify({
            title: 'JSCS',
            message: 'JSCS Passed. Let it fly!'
        }));

});