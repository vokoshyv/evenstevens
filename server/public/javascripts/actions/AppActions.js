/* 
* @Author: Nathan Bailey
* @Date:   2015-05-27 15:02:47
* @Last Modified by:   nathanbailey
* @Last Modified time: 2015-06-02 16:02:04
*/

var AppDispatcher = require('../dispatcher/AppDispatcher'); 

var AppActions = {
  addUser: function(userName) {
    AppDispatcher.dispatch({
      actionType: 'ADD_USER',
      payload: userName
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
        
        AppDispatcher.dispatch({
          actionType: 'BILL_NAME_LOADED',
          payload: billName
        });
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