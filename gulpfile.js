/* 
* @Author: vokoshyv
* @Date:   2015-05-26 17:12:39
<<<<<<< HEAD
* @Last Modified by:   vokoshyv
* @Last Modified time: 2015-05-27 20:06:51
=======
* @Last Modified by:   Nathan Bailey
* @Last Modified time: 2015-05-27 12:35:29
>>>>>>> Adds browserify to gulp file and begins Flux refactor
*/

'use strict';

// require gulp plugins
var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    livereload = require('gulp-livereload'),
    open = require('gulp-open'),
    shell = require('gulp-shell'),
    stylish = require('jshint-stylish'),
    // added
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
<<<<<<< HEAD
    reactify = require('reactify'),
    // for cleaning out files
    clean = require('gulp-clean'),
    // for delaying a pipe stream
    wait = require('gulp-wait');

// set up paths 
var paths = {
  scripts: ['server/public/javascripts/*.js','server/public/javascripts/**/*.js'],
=======
    reactify = require('reactify');


// set up paths 
var paths = {
  scripts: '[server/public/javascripts/*.js, server/public/javascripts/**/*.js]', 
>>>>>>> Adds browserify to gulp file and begins Flux refactor
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
<<<<<<< HEAD
    .pipe(gulp.dest('server/public/dist/'))
=======
    .pipe(gulp.dest('server/public/javascripts/dist/'))
>>>>>>> Adds browserify to gulp file and begins Flux refactor
});

gulp.task('scripts', function(){
  return gulp.src(
    paths.scripts
  )
  .pipe(jshint())
  .pipe(jshint.reporter(stylish))
  .pipe(wait(7000))
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

gulp.task('openInBrowser', function(){
  var options = {
    url: 'http://localhost:3000'
  };
  setTimeout(function(){
    gulp.src('./server/public/index.html')
    .pipe(open('', options));
  }, 7000)
});

gulp.task('clearDist', function(){
  return gulp.src('server/public/dist/bundle.js', {read: false})
  .pipe(clean());
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

<<<<<<< HEAD
gulp.task('default', ['clearDist', 'browserify', 'watch', 'startServer', 'openInBrowser']);
=======
gulp.task('default', ['browserify', 'watch', 'startServer', 'openInBrowser']);
>>>>>>> Adds browserify to gulp file and begins Flux refactor
