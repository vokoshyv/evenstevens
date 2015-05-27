/* 
* @Author: Nathan Bailey
* @Date:   2015-05-27 15:02:47
* @Last Modified by:   Nathan Bailey
* @Last Modified time: 2015-05-27 15:31:06
*/

var AppDispatcher = require('../dispatcher/AppDispatcher');

var AppActions = {

  addUser: function(userName) {
    AppDispatcher.dispatch({
      actionType: 'ADD_USER',
      name: userName
    });
  }

}

module.exports = AppActions;