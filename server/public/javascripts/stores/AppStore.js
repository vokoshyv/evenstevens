/* 
* @Author: Nathan Bailey
* @Date:   2015-05-27 14:23:20
* @Last Modified by:   Nathan Bailey
<<<<<<< HEAD
* @Last Modified time: 2015-05-27 20:29:36
=======
* @Last Modified time: 2015-05-27 14:38:15
>>>>>>> Adds browserify to gulp file and begins Flux refactor
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
      name = action.payload.trim();
      if (name !== '') {
        setName(name);
        AppStore.emitChange();
      }
      break;

    case 'HANDLE_IMAGE':
      file = action.payload;
      setImageFile(file);
      AppStore.emitChange();
      break;

    default: 
      console.log("ruh roh, you fell all the way through the switch :( ")

  }
});

module.exports = AppStore;

