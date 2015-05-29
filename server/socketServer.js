/* 
* @Author: Michael Harris
* @Date:   2015-05-25 19:12:12
* @Last Modified by:   Michael Harris
* @Last Modified time: 2015-05-28 16:45:16
*/

'use strict';
console.log('socketServer.js Loading STEP 2');

module.exports = function(app){
  var obj = {};

  obj.room = null;
  obj.roomJoined = false;

  // Start socket server
  obj.io = require('socket.io').listen( app.listen(app.get('port'), function () {
    console.log('Server started: http://localhost:' + app.get('port') + '/');
  }));

  obj.newRoom = function (req, res, cbRouter) {
    console.log('socketServer.js newRoom() set room from url STEP 3');
    var billname = req.url.split('/')[1]; // parse billname from url
    obj.room = billname;
    // obj.send({room: obj.room});
    // res.send('Created Room:' + obj.room + "\n");
    cbRouter(req, res, function(){return obj;} ); // pass in the socketServer
  };

  // send data to client
  obj.send = function(data){
    if (obj.room && obj.roomJoined) {
      console.log('Server emitting to room:', obj.room);
      data.billname = obj.room;
      console.log('Server emitting data:', data);
      obj.io.to(obj.room).emit('dataFromServer', data);
    } else {
      console.log('not emitting data to room...');
    }
  };

  obj.io.of('/').on('connection', function (socket) {
    console.log('connection (socket.io)');
    // obj.io.to(obj.room).emit('dataFromServer', {test:'helloworld'});

    // ---------------------- data from client
    socket.on('dataFromClient', function(data) {
      console.log('DATA FROM CLIENT');
      if (data.billname === obj.room && !obj.roomJoined) {
        obj.roomJoined = true;
        console.log('Client joining room', obj.room, 'roomJoined', obj.roomJoined);
        socket.join(obj.room);
      }
      if (data.billname !== undefined && data.billname !== '' && 
        data.billname === obj.room && obj.roomJoined) {

        console.log('Client to Server', data);
        var roomData = {roomData:'helloWorldData'};
        roomData.billname = data.billname;
        obj.send(roomData);
      }
    });
 
  });

  return obj;
};
