/* 
* @Author: Nathan Bailey
* @Date:   2015-05-27 15:02:47
* @Last Modified by:   Nathan Bailey
* @Last Modified time: 2015-05-27 17:13:54
*/

var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppStore = require('../stores/AppStore');

var AppActions = {
  addUser: function(userName) {
    AppDispatcher.dispatch({
      actionType: 'ADD_USER',
      payload: userName
    });
  },
  handleImage: function(file) {
    var formData = new FormData();
    var xhr = new XMLHttpRequest();

    formData.append('file', file);    
    xhr.open('POST', '/api/bills/' + AppStore.getUserName());
    xhr.onload = function () {
      if (xhr.status === 200) {
        console.log('all done: ' + xhr.status);
      } else {
        console.log('Something went terribly wrong...');
      }
    };

    xhr.send(formData);
    AppDispatcher.dispatch({
      actionType: 'HANDLE_IMAGE',
      payload: file
    });
  }


}

module.exports = AppActions;