/* 
* @Author: Nathan Bailey
* @Date:   2015-05-27 15:02:47
* @Last Modified by:   nathanbailey
* @Last Modified time: 2015-06-04 19:49:42
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


    // {
    //   billName: billName,
    //   userName: "bill",
    //   array:    [true, flase]
    //   update: { "bill": [true, false, true] }
    // }
    // sends just diner object
    // {billname:sdfsdfs
    //  dinerArray:sdfsdfsd}
    socket.emit('userUpdate', {data:data});
    console.log("EMITTING data to server");
  },

  joinSocketRoom : function(billName, userName) {

    // grabs current url for socket connection
    var url = window.location.href.split('/');  
    socket = io.connect(url[2]);
    socket.on('fromServerInitialData', function (data) {
      AppDispatcher.dispatch({
        actionType: 'INITIAL_DATA',
        payload: data
      });
  
    });

    // Listener for server broadcast of a single user's updated diner object.
    socket.on('fromServerUpdate', function(data) {});

    // This calls server to join room and get receipt data
    socket.emit('userJoin', {billName: billName});

    AppDispatcher.dispatch({
      actionType: 'BILL_NAME_LOADED',
      payload: billName
    });
  },
  toggleClaimed: function(itemIndex){
    AppDispatcher.dispatch({
      actionType: 'ITEM_TOGGLE',
      payload:itemIndex
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
      if (xhr.status === 201) {
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
};

module.exports = AppActions;