/* 
* @Author: Nathan Bailey
* @Date:   2015-05-28 15:15:14
* @Last Modified by:   nathanbailey
* @Last Modified time: 2015-06-02 15:59:50
*/

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');




var CHANGE_EVENT = 'change';

var _receipt = {
    billName: "tom",
    receipt: {
      items: [{
        item: 'Roasted Duck over Rice',
        cost: 10.20
      }, {
        item: 'Coke',
        cost: 1.80
      }, {
        item: 'Crab Meat Fried Rice',
        cost: 10.20
      }, {
        item: 'Wonton Soup',
        cost: 8.50
      }, {
        item: 'Hot Tea',
        cost: .95
      }],
      subTotal: 41.85,
      tax: 3.66,
      total: 45.51,
      tip: 6.28,
      grandTotal: 51.79
    },
    diners: [{
      diner: 'tom',
      itemIndex: [0,3]
    }, {
      diner: 'nate',
      itemIndex: []
    }]
  };

var _isLoaded = false;
var _items = [];
var _billName ="";


var setReceipt = function(updatedReceipt){
  _isLoaded = true;
  _receipt = updatedReceipt;
  console.log("_items: ",_items);
};

var setBillName = function(billName) {
  _billName = billName;
};

var ReceiptStore = assign({}, EventEmitter.prototype, {
  getReceiptObj: function() {
    return _receipt;
  },
  getReceiptIsLoaded: function(){
    return _isLoaded;
  },
  getBillName: function() {
    return _billName;
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
      setReceipt(JSON.parse(receipt));
      ReceiptStore.emitChange();
      break;
    case 'BILL_NAME_LOADED':
      billName = action.payload;
      setBillName(billName);
      ReceiptStore.emitChange();
      break;

    default: 
  }
});

module.exports = ReceiptStore;



