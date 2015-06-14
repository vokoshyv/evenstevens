/* 
* @Author: Nathan Bailey
* @Date:   2015-05-27 14:23:20
* @Last Modified by:   nathanbailey
* @Last Modified time: 2015-06-13 17:03:07
*/

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var stringMath = require('../../../utils/stringMath.js');

var CHANGE_EVENT = 'change';

// private app state variables
var _userName = null
var _billName = "";
var _isLoading = false;
var _diners = {};
var _itemCount = 0;
var _itemToDiner = [];
var _socket = null;
var _userTotals = {};
var _items = [];
var _totals = {};
var _taxPercent = "0%";
var _totalTax = "$0.00";
var _tipValue = "$0.00";
var _isAllClaimed = false;

// This sets the inital state of the receipt as received
// from the server on first connection
var setReceipt = function(items, diners, itemCount, itemToDiner, socket, billName) {
  _items = items;
  _itemCount = itemCount;
  _diners = diners;
  _itemToDiner = itemToDiner;
  _socket = socket;
  _billName = billName
};

// This sets the totals object when inital recipt data is received
var setTotals = function(receipt) {
  _totals.subTotal = receipt.subTotal
  _totals.tax = receipt.tax
  _totals.total = receipt.total
  _totals.tip = receipt.tip
  _taxPercent = stringMath.getTaxPercent(_totals.subTotal, _totals.tax);
  _tipValue = stringMath.percentOf(_totals.subTotal, _totals.tip);
  _totalTax = stringMath.percentOf(_totals.subTotal, _taxPercent);
  _totals.grandTotal = stringMath.sum(_totals.subTotal, _tipValue, _totalTax);
};

// updates tip percent 
var setTipPercent = function(tipPercent) {
   _totals.tip  = tipPercent;
}

// sets username 
var setName = function(name) {
  _userName = name;
};

// This variable controls when to show the loading view
var setLoading = function(bool) {
  _isLoading = bool;
};

// This function toggles an items claimed state
var setToggleItem = function(itemIndex) {

  // Toggle True/False in current users claimed items array
  _diners[_userName][itemIndex] = !_diners[_userName][itemIndex];

  var isClaimedByCurrentUser = _diners[_userName][itemIndex];
  var itemToDiner = _itemToDiner[itemIndex];

  // If currentUser is claiming item, push it to the 
  // itemToDiner array (this maps item index to user)
  if(isClaimedByCurrentUser){
    itemToDiner.push(_userName); 
  } else {
  // Otherwise, splice the name out of the array 
    var index = itemToDiner.indexOf(_userName);
    itemToDiner.splice(index, 1);
  }

  // maintain consistent order of diner names
  itemToDiner.sort();

  // Let the server know about the changes so that
  // the other 
  _socket.emit('userUpdate', {billName: _billName, 
    userName: _userName, array:  _diners[_userName] 
  });
};

// This function updates all user totals when an item is claimed
// or unclaimed and also checks if all items have been claimed
var calcUserTotals = function() {

  // overwrites old totals
  _userTotals = {};

  // keeps track of the number of claimed items
  var claimedCount = 0;

  // Iterates over the itemToDiner list
  _itemToDiner.forEach(function(item, index){

    // Increments claimed count if there are 1 or more diners
    // claiming this item
    if(item.length > 0) { ++claimedCount; }

    // Adds the price of the item to each diner claiming the item
    // Amount is split if more than one diner claiming
    item.forEach(function(name){
      _userTotals[name] = _userTotals[name] || "$0.00";
      _userTotals[name] = stringMath.sum(_userTotals[name],
        stringMath.divide(_items[index].cost, item.length));
    });
  });

  // Sets the "all claimed" state
  _isAllClaimed = (claimedCount === _itemCount) ? true : false;

  // Used to store the dollar value of the tip and tax
  // This will be added to the users total dollar value
  var userTip;
  var userTax;

  // apply tip and tax to each user total
  for(var name in _userTotals) {
    userTip = stringMath.percentOf(_userTotals[name], _totals.tip);
    userTax = stringMath.percentOf(_userTotals[name], _taxPercent);
    _userTotals[name]  = stringMath.sum(_userTotals[name], userTax, userTip);
  }
};

// Updates the clients diner object with changes from the server
// Only one diner is ever updated at a time
var updateDiners = function(diner){

  // overwrite old array with new diner data from server
  _diners[diner.userName] = diner.array;

  // index of name in itemToDiner array
  var nameIndex;

  // This updates the itemToDiner arrays to contain
  // a list of names of all the diners claiming each item
  for(var i = 0; i < _diners[diner.userName].length; i++){
    nameIndex = _itemToDiner[i].indexOf(diner.userName);
    if(_diners[diner.userName][i] && nameIndex === -1) {
       _itemToDiner[i].push(diner.userName);
    } else if (!_diners[diner.userName][i] && nameIndex > -1) {
      _itemToDiner[i].splice(nameIndex, 1);
    }

    // keeps diner names in order
    _itemToDiner[i].sort();
  }
};


// Public getters, used by the controller views to update app state
var AppStore = assign({}, EventEmitter.prototype, {
  getIsAllClaimed: function(){
    return _isAllClaimed;
  },
  getTipValue: function(){
    return _tipValue;
  },
  getTipPercent: function() {
    return _totals.tip;
  },
  getUserName: function() {
    return _userName;
  },
  getUserTotals: function() {
    return _userTotals;
  },
  getDiners: function() {
    return _diners;
  },
  getIsLoading: function() {
    return _isLoading;
  },
  getItemToDiner: function(){
    return _itemToDiner;
  },
  getItems: function() {
    return _items;
  },
  getBillName: function() {
    return _billName;
  },
  getTotals: function() {
    return _totals;
  },
  getUserTotals: function(){
    return _userTotals;
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


// Registers Actions listeners
AppDispatcher.register(function(action) {
  var name;
  switch(action.actionType) {
    case 'ADD_TIP_PERCENT':
      setTipPercent(action.payload);
      AppStore.emitChange();
      break;
    case 'ADD_USER':
      name = action.payload.trim();
      if (name !== '') {
        setName(name);
        AppStore.emitChange();
      }
      break;
    case 'ITEM_TOGGLE':
      setToggleItem(action.payload);
      calcUserTotals();
      AppStore.emitChange();
      break;
    case 'INITIAL_DATA':
      setTotals(action.receipt);
      setReceipt(action.items, action.diners,
        action.itemCount, action.itemToDiner, 
        action.socket, action.billName);
      calcUserTotals();
      AppStore.emitChange();
      break;
    case 'UPDATE_FROM_SERVER':
      updateDiners(action.payload);
      calcUserTotals();
      AppStore.emitChange();
      break;
    case 'TOGGLE_LOADING_VIEW':
      setLoading(action.payload);
      AppStore.emitChange();
      break;
    default: 
    return;
  }
});

module.exports = AppStore;

