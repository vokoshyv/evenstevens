/* 
* @Author: Michael Harris
* @Date:   2015-05-25 19:12:12
* @Last Modified by:   Michael Harris
* @Last Modified time: 2015-05-25 19:27:45
*/

'use strict';

module.exports = function(app){
  var obj = {};

  // Start socket server
  obj.io = require('socket.io').listen( app.listen(app.get('port'), function () {
    console.log('Server started: http://localhost:' + app.get('port') + '/');
  }));

  obj.send = function(dataObject){
    obj.io.emit('dataFromServer', dataObject);
  };

  obj.onDataFromClient = function(dataObject){
    console.log ('onDataFromClient', dataObject);
    obj.send({value: 'world'});
  };

  obj.io.of('/').on('connection', function (socket) {
    socket.on('dataFromClient', obj.onDataFromClient);
  });

  return obj;
};
