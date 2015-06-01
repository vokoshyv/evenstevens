/* 
* @Author: Nathan Bailey
* @Date:   2015-05-28 15:15:14
* @Last Modified by:   vokoshyv
* @Last Modified time: 2015-05-29 20:11:38
*/

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _receipt = {};
var _isLoaded = false;
var _items = [];
var _diners = [];

var _setReceipt = function(updatedReceipt){
  _isLoaded = true;
  _receipt = updatedReceipt;
  console.log("_items: ",_items);
};




var ReceiptStore = assign({}, EventEmitter.prototype, {
  getReceiptObj: function() {
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
      _setReceipt(JSON.parse(receipt));
      ReceiptStore.emitChange();
    break;
    
    default: 
  }
});

module.exports = ReceiptStore;



