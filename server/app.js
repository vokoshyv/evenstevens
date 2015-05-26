/*
* @Author: hal
* @Date:   2015-05-22 10:53:35
* @Last Modified by:   Michael Harris
* @Last Modified time: 2015-05-28 19:20:44
*/

// set up server variables
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var express = require('express');
var bodyParser = require('body-parser');
var bill = require('./api/bill/index');
var app = express();

app.set('port', (process.env.PORT || 3000));

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/bills', bill);
app.use(express.static(path.join(__dirname, 'public')));

app.use('*', function (req, res) {
  res.sendfile('public/index.html', {root: __dirname});
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

var socketServer = require('./socketServer')(app);

module.exports = app;