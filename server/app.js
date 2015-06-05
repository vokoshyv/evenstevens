/*
* @Author: hal
* @Date:   2015-05-22 10:53:35
* @Last Modified by:   nathanbailey
* @Last Modified time: 2015-06-02 17:14:36
*/

// set up server variables
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var http = require('http');
var server = http.createServer(app);
var io = require('socket.io')(server);
var controller = require('./api/bill/controller');

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
app.use(express.static(path.join(__dirname, 'public')));

//setup routes
require('./routes')(app);

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

var sockets = {};

var namespace = '/';
io.of(namespace).on('connection', function(socket){
  socket.on('userJoin',           function(data) { onUserJoin(socket, data); });
  socket.on('userUpdate',         function(data) { onUserUpdate(socket, data); });
  socket.on('disconnect', onDisconnect);
});

var socketLog = function(socket, data) {
  console.log('SOCKET / connection', socket.id, "room ", socket.rooms, data);
};

// client sends billName to join room
var onUserJoin = function (socket, data) {
  var room = data.billName;
  if (room !== undefined && room !== '') {
    socket.join(data.billName, function(){
      controller.show(socket, data);
    });
  }
};

// client updated its data and sent it to server, handled here
var onUserUpdate = function (socket, data) {
  controller.update(io, data);
};

var onDisconnect = function (socket) {
};

module.exports = app;