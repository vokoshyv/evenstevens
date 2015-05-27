/* 
* @Author: Nathan Bailey
* @Date:   2015-05-27 15:02:47
* @Last Modified by:   Nathan Bailey
* @Last Modified time: 2015-05-27 16:40:58
*/

var AppDispatcher = require('../dispatcher/AppDispatcher');

var AppActions = {

  addUser: function(userName) {
    AppDispatcher.dispatch({
      actionType: 'ADD_USER',
      payload: userName
    });
  },
  handleImage: function(form) {
    AppDispatcher.dispatch({
      actionType: 'HANDLE_IMAGE',
      payload: form.file
    });
  }

}

module.exports = AppActions;