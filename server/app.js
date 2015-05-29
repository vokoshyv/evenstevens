/*
* @Author: hal
* @Date:   2015-05-22 10:53:35
* @Last Modified by:   Michael Harris
* @Last Modified time: 2015-05-29 15:25:25
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

// Start server
// app.listen(app.get('port'), function () {
//   console.log('Server started: http://localhost:' + app.get('port') + '/');
// });

// start socket server
// console.log(3'app.js initiate socketServer STEP 1');
// var socketServer = require('./socketServer')(app);

var sockets = {};

var namespace = '/';
io.of(namespace).on('connection', function(socket){
  socket.on('userJoin',           function(data) { onUserJoin(socket, data); });
  socket.on('userFirstRun',       function(data) { onUserFirstRun(socket, data); });
  socket.on('userUpdate',         function(data) { onUserUpdate(socket, data); });
  socket.on('disconnect', onDisconnect);
});

var socketLog = function(socket, data) {
  console.log('SOCKET / connection', socket.id, socket.rooms, data);
};

// client sends billname to join room
var onUserJoin = function (socket, data) {
  var room = data.billname;
  if (room !== undefined && room !== '') {
    socket.join(data.billname);
  }
};

// client requesting initial data from server
var onUserFirstRun = function (socket, data) {
  socketLog(socket, data);
  // Run controller show based off of whole party object (receipt in database)
  io.to(data.billname).emit('fromServerInitialData', {dataFromServer: 'broadcast'});
};

// client updated its data and sent it to server, handled here
var onUserUpdate = function (socket, data) {
  socketLog(socket, data);
  var updateData = controller.update(data); // save changes to data base
  io.to(data.billname).emit('fromServerUpdate', updateData); // broadcast changes to everyone
};

var onDisconnect = function (socket) {
};

module.exports = app;