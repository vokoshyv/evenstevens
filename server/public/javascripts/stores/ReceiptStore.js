/* 
* @Author: Nathan Bailey
* @Date:   2015-05-28 15:15:14
* @Last Modified by:   Johnny Nguyen
* @Last Modified time: 2015-06-05 20:33:13
*/

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');


var CHANGE_EVENT = 'change';

var _items = [];
var _totals = {};
var _billName ="";
var _tipPercent = 0;


var setItems = function(items) {
  _items = items;
}

var setTotals = function(receipt) {
  _totals.subTotal = receipt.subTotal
  _totals.tax = receipt.tax
  _totals.total = receipt.total
  _totals.tip = receipt.tip
  _totals.grandTotal =receipt.grandTotal
}

var setBillName = function(billName) {
  _billName = billName;
};

var setTipPercent = function(tipPercent) {
  _tipPercent = tipPercent;
}

var ReceiptStore = assign({}, EventEmitter.prototype, {
  getItems: function() {
    return _items;
  },
  getBillName: function() {
    return _billName;
  },
  getTotals: function() {
    return _totals;
  },
  getTipPercent: function() {
    return _tipPercent;
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
  var billName;
  var tipPercent;

  switch(action.actionType) {
    case 'ADD_TIP_PERCENT':
      tipPercent = action.payload;
      setTipPercent(tipPercent);
      ReceiptStore.emitChange();
      break;
    case 'BILL_NAME_LOADED':
      billName = action.payload;
      setBillName(billName);
      ReceiptStore.emitChange();
      break;
    case 'INITIAL_DATA':
      receipt = action.receipt;
      items = action.items;
      billName = action.billName;
      setBillName(billName);
      setItems(items);
      setTotals(receipt);
      ReceiptStore.emitChange();
      break;
    default: 
  }
});

module.exports = ReceiptStore;



