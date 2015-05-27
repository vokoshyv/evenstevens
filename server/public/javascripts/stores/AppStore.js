/* 
* @Author: Nathan Bailey
* @Date:   2015-05-27 14:23:20
* @Last Modified by:   Nathan Bailey
* @Last Modified time: 2015-05-27 15:31:46
*/

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _userName = "";
var _imgPath = "";


var setName = function(name) {
  _userName = name;
  console.log(name);
};

var setImgPath = function(path) {
  _imgPath = path;
}



var AppStore = assign({}, EventEmitter.prototype, {

  getUserName: function() {
    return _userName;
  },

  getImgPath: function() {
    return _imgPath;
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

AppDispatcher.register(function(action) {
  var name;

  switch(action.actionType) {
    case 'ADD_USER':
      name = action.name.trim();
      if (name !== '') {
        setName(name);
        AppStore.emitChange();
      }
      break;

    default:

  }
});

module.exports = AppStore;