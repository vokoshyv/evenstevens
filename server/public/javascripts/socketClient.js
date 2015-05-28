/* 
* @Author: Michael Harris
* @Date:   2015-05-25 16:46:01
* @Last Modified by:   Michael Harris
* @Last Modified time: 2015-05-27 20:51:02
*/

'use strict';
console.log('socketClient.js Loading');
var billname = window.location.href.split('billname=')[1];
console.log(window.location.href);

var SocketClient = function(uri){
  var obj = {};
  obj.socket = io.connect(uri);
  obj.room = billname;

  // send data to server
  obj.send = function(data){
    data.billname = obj.room;
    console.log('Client to Server', data);
    obj.socket.emit('dataFromClient', data);
  };

   // ---------------------- data from server
  obj.socket.on('dataFromServer', function (data) {
    console.log('Server to Client', data);
  });

  return obj;
};
