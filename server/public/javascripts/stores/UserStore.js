/* 
* @Author: Nathan Bailey
* @Date:   2015-05-27 14:23:20
* @Last Modified by:   nathanbailey
* @Last Modified time: 2015-06-04 20:22:07
*/

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _userName = null
var _billName = "";
var _isLoading = false;
var _diners = {};
var _itemCount = 0;
var _itemToDiner = [];

var setName = function(name) {
  _userName = name;
};

var setLoading = function(bool) {
  _isLoading = bool;
};

var setDiners = function(diners, itemCount) {
  _itemCount = itemCount;
   _diners = diners;
  if(_diners[_userName] > 0) {
    console.log("duplicate user");
  } else {
    var claimedArray = [];
    while(itemCount--) {
      claimedArray[itemCount] = false;
      _itemToDiner[itemCount] = [];
    }

    _diners[_userName] = claimedArray;

    for(var diner in _diners){
      for(var i = 0; i < _diners[diner].length; i++){
        if(_diners[diner][i]) {
           _itemToDiner[i].push(diner);
        }
      }
    }   
  }
};

var setToggleItem = function(itemIndex) {
  _diners[_userName][itemIndex] = !_diners[_userName][itemIndex];

  var isClaimed = _diners[_userName][itemIndex];


  var claimedNames = _itemToDiner[itemIndex];

 if(isClaimed){
    claimedNames.push(_userName);
 } else {
  var index = claimedNames.indexOf(_userName);
  claimedNames.splice(index, 1);
 }

 console.log(isClaimed);


};

var UserStore = assign({}, EventEmitter.prototype, {

  getUserName: function() {
    return _userName;
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
  var bool;
  var diners
  var item;
  var itemCount;

  switch(action.actionType) {
    case 'ADD_USER':
      name = action.payload.trim();
      if (name !== '') {
        setName(name);
        UserStore.emitChange();
      }
      break;
    case 'ITEM_TOGGLE':
      itemIndex = action.payload;
      setToggleItem(itemIndex);
      UserStore.emitChange();
      break;
    case 'INITIAL_DATA':
      var itemCount = JSON.parse(action.payload.receipt).items.length;
      diners = JSON.parse(action.payload.diners);
      setDiners(diners, itemCount);
      UserStore.emitChange();
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

