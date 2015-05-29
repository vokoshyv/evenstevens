/* 
* @Author: Nathan Bailey
* @Date:   2015-05-27 14:23:20
* @Last Modified by:   Nathan Bailey
* @Last Modified time: 2015-05-28 17:16:42
*/

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';


var _userName = "";
var _processingImg = false;

var setName = function(name) {
  _userName = name;
};

var setBeingProcessed = function(bool) {
  _processingImg = bool;
}

var AppStore = assign({}, EventEmitter.prototype, {

  getUserName: function() {
    return _userName;
  },

  getBeingProcessed: function() {
    return _processingImg;
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

    case 'PROCESSING_IMAGE':
      bool = action.payload;
      setBeingProcessed(bool);
      AppStore.emitChange();
      break;

    case 'UPDATE_RECEIPT':
      setBeingProcessed(false);
      AppStore.emitChange();
      break;

    default: 
    return;

  }
});

module.exports = AppStore;

