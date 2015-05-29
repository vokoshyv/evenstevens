/* 
* @Author: Nathan Bailey
* @Date:   2015-05-28 15:15:14
* @Last Modified by:   Nathan Bailey
* @Last Modified time: 2015-05-28 17:12:31
*/

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _receipt = {};

var _updateReceipt = function(updatedReceipt){
  _receipt = updatedReceipt;
  console.log("on update ", _receipt);
};


var ReceiptStore = assign({}, EventEmitter.prototype, {
  getReceiptItems: function() {
    console.log("get ",_receipt);
    return _receipt;
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  emitChange: function() {
    console.log("change emitted");
    this.emit(CHANGE_EVENT);
  },
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

AppDispatcher.register(function(action) {
  var receipt;

   switch(action.actionType) {
    case 'UPDATE_RECEIPT': 
    // var receipt = action.payload;
    receipt = {
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
          cost: 10.20
        }],
        subTotal: 41.85,
        tax: 3.66,
        total: 45.51,
        tip: 6.28,
        grandTotal: 51.79
      },
      diners: [{
        diner: 'tom',
        itemIndex: []
      }]
    };
    _updateReceipt(receipt);
    ReceiptStore.emitChange();
    break;

    default: 
  }
});

module.exports = ReceiptStore;



