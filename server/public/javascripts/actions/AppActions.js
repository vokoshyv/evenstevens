/* 
* @Author: Nathan Bailey
* @Date:   2015-05-27 15:02:47
* @Last Modified by:   Nathan Bailey
* @Last Modified time: 2015-05-29 11:06:22
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
    xhr.open('POST', '/api/bills/' + name); // this might go against the flux...
    xhr.onload = function () {
      if (xhr.status === 200) {
        console.log('all done: ' + xhr.status);

        AppDispatcher.dispatch({
          actionType: 'RECEIPT_LOADED',
          payload: xhr.responseText
        });

      } else {
        console.log('Something went terribly wrong...');
      }
    };

    xhr.send(formData);
    
    AppDispatcher.dispatch({
      actionType: 'PROCESSING_IMAGE',
      payload: true
    });

  }


}

module.exports = AppActions;