/* 
* @Author: vokoshyv
* @Date:   2015-05-26 17:12:39
* @Last Modified by:   vokoshyv
* @Last Modified time: 2015-05-26 20:27:40
*/

'use strict';

// require gulp plugins
var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    livereload = require('gulp-livereload'),
    open = require('gulp-open'),
    shell = require('gulp-shell'),
    stylish = require('jshint-stylish');

// set up paths 
var paths = {
  scripts: 'server/public/javascripts/*.js', 
  server: 'server/*.js', 
  styles: 'server/public/stylesheets/*.css',
  billRoute: 'server/api/bill/*.js', 
  html: 'server/public/index.html'
}

