/* 
* @Author: vokoshyv
* @Date:   2015-05-26 17:12:39
* @Last Modified by:   vokoshyv
* @Last Modified time: 2015-06-16 13:03:54
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
    reactify = require('reactify'),
    // for cleaning out files
    del = require('del'),
    // for delaying a pipe stream
    wait = require('gulp-wait');

/**
 * Provides all of the routes that gulp will use to watch 
 * files and to perform operations
 */
var paths = {
  scripts: ['server/public/javascripts/*.js','server/public/javascripts/**/*.js'],
  server: 'server/*.js', 
  styles: 'server/public/stylesheets/*.css',
  billRoute: 'server/api/bill/*.js', 
  utils: 'server/utils/*.js', 
  html: 'server/public/index.html'
}

/**
 * When run, this task takes the files that have been 
 * required for react.js files and combines them all into a 
 * single file titled "bundle.js" - allows for faster page
 * load since only a single file is required instead of 
 * multiple ones
 */
gulp.task('browserify', function() {
  var b = browserify();
  b.transform(reactify);
  b.add('server/public/javascripts/main.js');
  return b.bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('server/public/dist/'))
});

/**
 * When run, this task performs jshint on the files in the 
 * 'scripts' path. The results will be displayed in the 
 * terminal
 */
gulp.task('scripts', function(){
  return gulp.src(
    paths.scripts
  )
  .pipe(jshint())
  .pipe(jshint.reporter(stylish))
  .pipe(wait(4000))
  .pipe(livereload());
});

/**
 * When run, this task performs jshint on the files in the 
 * 'server' path. The results will be displayed in the 
 * terminal
 */
gulp.task('server', function(){
  return gulp.src([
    paths.server
  ])
  .pipe(jshint())
  .pipe(jshint.reporter(stylish));
});

/**
 * When run, this task performs jshint on the files in the 
 * 'styles' path. The results will be displayed in the 
 * terminal
 */
gulp.task('styles', function(){
  return gulp.src([
    paths.styles
  ])
  .pipe(livereload());
});

/**
 * When run, this task performs jshint on the files in the 
 * 'billRoute' path. The results will be displayed in the 
 * terminal
 */
gulp.task('billRoute', function(){
  return gulp.src([
    paths.billRoute
  ])
  .pipe(jshint())
  .pipe(jshint.reporter(stylish))
  .pipe(livereload());
});

/**
 * When run, this task performs jshint on the files in the 
 * 'utils' path. The results will be displayed in the 
 * terminal
 */
gulp.task('utils', function(){
  return gulp.src([
    paths.utils
  ])
  .pipe(jshint())
  .pipe(jshint.reporter(stylish))
  .pipe(livereload());
});

/**
 * When run, this task will reload the web page
 */
gulp.task('html', function(){
  return gulp.src([
    paths.html
  ])
  .pipe(livereload());
});

/**
 * When run, this task will start up a nodemon server; this
 * command is used to start the server at the end of all of
 * the gulpfile tasks
 */
gulp.task('startServer', shell.task([
  //'redis-server', 
  'nodemon server/app.js'
]));

/**
 * When run, this task will run 'npm test' in the terminal; 
 * this is used during the Travis.ci tests when GitHub
 * repositories are pushed to personal origins and when
 * pull requests are made to the organization master repo
 */
gulp.task('test', shell.task([
  'npm test'
]));

/**
 * When run, this task opens up a localhost:3000 url in the 
 * browser. 
 */
gulp.task('openInBrowser', function(){
  var options = {
    url: 'http://localhost:3000'
  };
  setTimeout(function(){
    gulp.src('./server/public/index.html')
    .pipe(open('', options));
  }, 7000)
});

/**
 * When run, this task deletes the bundle.js file. It is 
 * used before browserifying is run in order to delete the
 * previous bundle.js file. 
 */
gulp.task('clearDist', function(cb){
  del([
    'server/public/dist/bundle.js'
    ], cb)
});

/**
 * This task is a watcher for all of the different files 
 * along the different paths of the project. When any 
 * changes are made in the particular files, the watcher 
 * will perform the associated tasks. 
 */
gulp.task('watch', function(){
  livereload.listen();

  gulp.watch(paths.server, ['server']);
  gulp.watch(paths.styles, ['styles']);
  gulp.watch(paths.billRoute, ['billRoute']);
  gulp.watch(paths.utils, ['utils']);
  gulp.watch(paths.html, ['html']);
  gulp.watch(paths.scripts, ['clearDist', 'browserify', 'scripts']);

})

/**
 * When run, this task will run the necessary tasks in order
 * to build the project, start the server, and open the 
 * web application in the browser. 
 */
gulp.task('default', ['clearDist', 'browserify', 'watch', 'startServer', 'openInBrowser']);

/**
 * When run, this task will perform linting of the files in 
 * the 'paths.scripts' location
 */
gulp.task('lint', function() {
  return gulp.src(paths.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});
