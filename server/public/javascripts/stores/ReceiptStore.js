/* 
* @Author: Nathan Bailey
* @Date:   2015-05-28 15:15:14
* @Last Modified by:   Nathan Bailey
* @Last Modified time: 2015-05-29 12:02:57
*/

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _receipt = {};
var _isLoaded = false;

var _updateReceipt = function(updatedReceipt){
  _toggleLoaded();
  _receipt = updatedReceipt;
};

var _toggleLoaded = function(){
  _isLoaded = !_isLoaded;
};


var ReceiptStore = assign({}, EventEmitter.prototype, {
  getReceiptItems: function() {
    return _receipt;
  },
  receiptIsLoaded: function(){
    return _isLoaded;
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
  var receipt;

  switch(action.actionType) {
    case 'RECEIPT_LOADED': 
      var receipt = action.payload;
      console.log(receipt);
      _updateReceipt(JSON.parse(receipt));
      ReceiptStore.emitChange();
    break;

    default: 
  }
});

module.exports = ReceiptStore;



