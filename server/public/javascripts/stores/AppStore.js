/* 
* @Author: Nathan Bailey
* @Date:   2015-05-27 14:23:20
* @Last Modified by:   Nathan Bailey
* @Last Modified time: 2015-05-27 16:39:19
*/

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _userName = "";
var _imageFile = null;


var setName = function(name) {
  _userName = name;
};

var setImageFile = function(file) {
  _imageFile = file;
  console.log(_imageFile);
}



var AppStore = assign({}, EventEmitter.prototype, {

  getUserName: function() {
    return _userName;
  },

  getImageFile: function() {
    return _imageFile;
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
  var files;

  switch(action.actionType) {
    case 'ADD_USER':
      name = action.name.trim();
      if (name !== '') {
        setName(name);
        AppStore.emitChange();
      }
      break;
    case 'HANDLE_IMAGE':
      file = action.payload;
      if(action.length > 0) {
        setImageFile(files[0]);
        AppStore.emitChange();
      } else {
        console.log('boo no file');
      }
      break;

    default:

  }
});

module.exports = AppStore;