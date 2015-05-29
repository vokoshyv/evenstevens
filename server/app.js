/*
* @Author: hal
* @Date:   2015-05-22 10:53:35
* @Last Modified by:   Michael Harris
* @Last Modified time: 2015-05-29 01:25:55
*/

// set up server variables
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var express = require('express');
var bodyParser = require('body-parser');
var bill = require('./api/bill/index');
var app = express();

var http = require('http');
var server = http.createServer(app);
var io = require('socket.io')(server);

var port = process.env.PORT || 3000;
app.set('port', port);
server.listen(port, function () {
  console.log('Server listening on port', port);
});

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

// app.use('/api/bills/', function(req, res){ socketServer.newRoom(req, res, bill); });
// app.use('/api/bills', bill);

// app.use('/api/bills', function(req, res, cb) {bill(req, res, function(){ return io;}) });

// app.use('/', express.static(path.join(__dirname, 'public')));

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

// Start server
// app.listen(app.get('port'), function () {
//   console.log('Server started: http://localhost:' + app.get('port') + '/');
// });

// start socket server
// console.log('app.js initiate socketServer STEP 1');
// var socketServer = require('./socketServer')(app);

var sockets = {};

var namespace = '/';
io.of(namespace).on('connection', function(socket){
  socket.on('primaryUserFirstRun',  function(data) { onPrimaryUserFirstRun(socket, data) });
  socket.on('standardUserFirstRun', function(data) { onStandardUserFirstRun(socket, data) });
  socket.on('standardUserSecondRun', function(data) { onStandardUserSecondRun(socket, data) });
  socket.on('disconnect', onDisconnect);
});

var socketLog = function(socket, data) {
  console.log('SOCKET / connection', socket.id, socket.rooms, data);
};

var onPrimaryUserFirstRun = function (socket) {
};

var onStandardUserFirstRun = function (socket, data) {
  socket.join(data.billname);
};

var onStandardUserSecondRun = function (socket, data) {
  socketLog(socket, data);
  io.to(data.billname).emit('dataFromServer', {dataFromServer: 'broadcast'});
};

var onDisconnect = function (socket) {
};

module.exports = app;