/* 
* @Author: Nathan Bailey
* @Date:   2015-05-27 15:02:47
* @Last Modified by:   nathanbailey
* @Last Modified time: 2015-06-26 15:28:50
*/

var AppDispatcher = require('../dispatcher/AppDispatcher'); 
var socket; // holds the socket instance

var AppActions = {
  // Dispatches action to set userName
  addUser: function(userName) {
    AppDispatcher.dispatch({
      actionType: 'ADD_USER',
      payload: userName
    });
  },
  // Dispatches action to set tip percent
  addTipPercent: function(tipPercent) {
    AppDispatcher.dispatch({
      actionType: 'ADD_TIP_PERCENT',
      payload: tipPercent
    })
  },
  // Processes initial data from server. This method sets up
  // the initial data data structures for a user
  processDataFromServer: function(data, userName, billName) {
    var receipt = JSON.parse(data.receipt);
    var items = receipt.items;
    var itemCount = items.length;
    var diners = JSON.parse(data.diners);
    var itemToDiner = []; // maps item to list of diners
    var populateWithFalse = false;
    
    // if new user, creates a new array in the diner
    // object to store the claim info
    if(!diners[userName]) {
      diners[userName] = [];
      populateWithFalse = true;
    }

    // prepares data structures 
    for(var i = 0; i < itemCount; i++) {
      if (populateWithFalse) {
        diners[userName].push(false);
      }
      itemToDiner[i] = [];
    }

    // Checks for claimed items in the diner object and
    // adds the corresponding name to the itemToDiner array
    for(var diner in diners){
      for(var i = 0; i < diners[diner].length; i++){
        if(diners[diner][i]) {
          itemToDiner[i].push(diner);
        }
      }
    }   

    // Dispatches the data from server to the be 
    // rendered in the UI
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
  },
  // This method connects the client to the socket room 
  joinSocketRoom : function(billName, userName) {

    // grabs current url for socket connection
    var url = window.location.href.split('/');  
    // socket = io.connect(url[url.length-2]);

    //socket = io.connect('http://evenstevens.co/');
    socket = io.connect('localhost:3000');

    // Processes data from server
    socket.on('fromServerInitialData', function (data) {
      AppActions.processDataFromServer(data, userName, billName );
    });

    // Listener for server broadcast of a single user's updated diner object.
    socket.on('fromServerUpdate', function(data) {
      AppDispatcher.dispatch({
        actionType: 'UPDATE_FROM_SERVER',
        payload:data
      });
    });

    // This calls server to join room and get receipt data
    socket.emit('userJoin', {billName: billName});

  },
  // This method emits an item toggle event to trigger
  // UI and item total recalculations
  toggleClaimed: function(itemIndex){
    AppDispatcher.dispatch({
      actionType: 'ITEM_TOGGLE',
      payload:itemIndex
    });
  },
  // This method accepts the receipt image and sends
  // it to the server for OCR processing
  handleImage: function(userFile) {
    var file = userFile.file;
    var name = userFile.userName;
    var tipPercent = userFile.tipPercent;

    // prepares the form for posting
    var formData = new FormData();
    var xhr = new XMLHttpRequest();
    formData.append('file', file);
    formData.append('billName', name);
    formData.append('tipPercent', tipPercent);

    xhr.open('POST', '/api/bills/' + name); 

    // Accepts the response from the server and triggers
    // the client to join the web socket instance associated
    // with the receipt
    xhr.onload = function () {
      if (xhr.status === 201) {
        var billName = JSON.parse(xhr.responseText).billName;
      
        // Join socket
        AppActions.joinSocketRoom(billName, name);
      } else {
        console.log('Something went terribly wrong...');
      }
    };

    // Send form with receipt image
    xhr.send(formData);
    
    // This triggers a loading animation
    AppDispatcher.dispatch({
      actionType: 'TOGGLE_LOADING_VIEW',
      payload: true
    });
  }
};

/**
 * This code block exports AppActions to be required in 
 * other portions of the project files
 * @type {object}
 */
module.exports = AppActions;