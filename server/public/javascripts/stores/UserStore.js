/* 
* @Author: Nathan Bailey
* @Date:   2015-05-27 14:23:20
* @Last Modified by:   Nathan Bailey
* @Last Modified time: 2015-05-30 16:37:06
*/

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _userName = "";
var _billName = "";
var _isLoading = false;

var setName = function(name) {
  _userName = name;
};

var setLoading = function(bool) {
  _isLoading = bool;
};

var UserStore = assign({}, EventEmitter.prototype, {

  getUserName: function() {
    return _userName;
  },

  getIsLoading: function() {
    return _isLoading;
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
  var bool;
  var billName;

  switch(action.actionType) {
    case 'ADD_USER':
      name = action.payload.trim();
      if (name !== '') {
        setName(name);
        UserStore.emitChange();
      }
      break;

    case 'TOGGLE_LOADING_VIEW':
      bool = action.payload;
      setLoading(bool);
      UserStore.emitChange();
      break;



    default: 
    return;

  }
});

module.exports = UserStore;

