/* 
* @Author: Nathan Bailey
* @Date:   2015-05-27 15:02:47
* @Last Modified by:   nathanbailey
* @Last Modified time: 2015-06-02 17:15:39
*/

var AppDispatcher = require('../dispatcher/AppDispatcher'); 

var socket;

var AppActions = {
  addUser: function(userName) {
    AppDispatcher.dispatch({
      actionType: 'ADD_USER',
      payload: userName
    });
  },
  socketEmitUpdate: function(data){

    // sends just diner object
    // {billname:sdfsdfs
    //  dinerArray:sdfsdfsd}
    socket.emit('userUpdate', {data:data});
    console.log("EMITTING data to server");
  },

  joinSocketRoom : function(billName, userName) {
    socket = io.connect('localhost:3000');

    socket.on('fromServerInitialData', function (data) {

      AppDispatcher.dispatch({
        actionType: 'INITIAL_DATA',
        payload: data
      });
  
    });

    socket.on('fromServerUpdate', function(data) {
      console.log('Server to client update ', data)
    });

    // This calls server to join room and get receipt data
    socket.emit('userJoin', {billName: billName});


    AppDispatcher.dispatch({
      actionType: 'BILL_NAME_LOADED',
      payload: billName
    });
  },
  handleImage: function(userFile) {
    var file = userFile.file;
    var name = userFile.userName;
    var formData = new FormData();
    var xhr = new XMLHttpRequest();

    formData.append('file', file);    
    xhr.open('POST', '/api/bills/' + name); 
    xhr.onload = function () {
      if (xhr.status === 200) {
        console.log('response ' + xhr.status);

        var billName = JSON.parse(xhr.responseText).billName;
        
        // Join socket
        AppActions.joinSocketRoom(billName, name);

      } else {
        console.log('Something went terribly wrong...');
      }
    };

    xhr.send(formData);
    
    // This triggers a loading animation
    AppDispatcher.dispatch({
      actionType: 'TOGGLE_LOADING_VIEW',
      payload: true
    });
  }
}

module.exports = AppActions;