/* 
* @Author: Nathan Bailey
* @Date:   2015-05-27 15:02:47
* @Last Modified by:   Johnny Nguyen
* @Last Modified time: 2015-06-05 20:40:28
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
  addTipPercent: function(tipPercent) {
    AppDispatcher.dispatch({
      actionType: 'ADD_TIP_PERCENT',
      payload: tipPercent
    })
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
    socket = io.connect('http://localhost:3000');

    socket.on('fromServerInitialData', function (data) {
      var receipt = JSON.parse(data.receipt);
      var items = receipt.items;
      var itemCount = items.length;
      var diners = JSON.parse(data.diners);
      var itemToDiner = [];

      // if(diners[userName] && diners[userName].length > 0) {
      //   console.log("duplicate user");
      // } else {
      // 
      var populateWithFalse = false;
      
      if(!diners[userName]) {
        diners[userName] = [];
        populateWithFalse = true;
      }
        while(itemCount--) {
          if (populateWithFalse) {
            diners[userName].push(false);
          }
            itemToDiner[itemCount] = [];
        }

        for(var diner in diners){
          for(var i = 0; i < diners[diner].length; i++){
            if(diners[diner][i]) {
               itemToDiner[i].push(diner);
            }
          }
        }   
      // }

      AppDispatcher.dispatch({
        actionType: 'INITIAL_DATA',
        itemCount: itemCount,
        diners: diners,
        itemToDiner: itemToDiner,
        receipt: receipt,
        items: items,
        billName:billName,
        socket:socket
      });
  
    });

    // Listener for server broadcast of a single user's updated diner object.
    socket.on('fromServerUpdate', function(data) {
      console.log("got Data!!!! ", data);
      AppDispatcher.dispatch({
        actionType: 'UPDATE_FROM_SERVER',
        payload:data
      });
    });

    // This calls server to join room and get receipt data
    socket.emit('userJoin', {billName: billName});

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
    var tipPercent = userFile.tipPercent;
    var formData = new FormData();
    var xhr = new XMLHttpRequest();

    formData.append('file', file);
    formData.append('billName', name);
    formData.append('tipPercent', tipPercent);

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