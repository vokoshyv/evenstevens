/* 
* @Author: Michael Harris
* @Date:   2015-05-25 16:46:01
* @Last Modified by:   Michael Harris
* @Last Modified time: 2015-05-25 19:40:43
*/

'use strict';
console.log('Running socketClient.js ...');
var SocketClient = function(uri){
  var obj = {};
  obj.socket = io.connect(uri);

  obj.onDataFromServer = function(dataObject){
    console.log('onDataFromServer()', dataObject);
  };

  obj.send = function(dataObject){
    console.log('socketClient.send()');
    obj.socket.emit('dataFromClient', dataObject);
  };

  // setup custom event callbacks
  obj.socket.on('dataFromServer', obj.onDataFromServer);

  return obj;
};
