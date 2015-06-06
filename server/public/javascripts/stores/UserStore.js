/* 
* @Author: Nathan Bailey
* @Date:   2015-05-27 14:23:20
* @Last Modified by:   Nathan Bailey
* @Last Modified time: 2015-06-05 16:12:10
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
var _socket = null;

var setName = function(name) {
  _userName = name;
};

var setLoading = function(bool) {
  _isLoading = bool;
};

var setDiners = function(diners, itemCount, itemToDiner, socket, billName) {
  _itemCount = itemCount;
  _diners = diners;
  _itemToDiner = itemToDiner;
  _socket = socket;
  _billName = billName
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

   claimedNames.sort();
   _socket.emit('userUpdate', {billName: _billName, userName: _userName, array:  _diners[_userName] } );
};

var updateDiners = function(diner){
  _diners[diner.userName] = diner.array;
  var nameIndex;

    for(var i = 0; i < _diners[diner.userName].length; i++){
      nameIndex = _itemToDiner[i].indexOf(diner.userName);

      if(_diners[diner.userName][i] && nameIndex === -1) {
         _itemToDiner[i].push(diner.userName);
      } else if (!_diners[diner.userName][i] && nameIndex > -1 ) {
        _itemToDiner[i].splice(nameIndex, 1);
      }
      _itemToDiner[i].sort();
    }
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
  var itemToDiner;
  var socket;
  var dinerToUpdate;

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
      itemCount = action.itemCount;
      diners = action.diners;
      socket = action.socket;
      billName = action.billName;
      itemToDiner = action.itemToDiner;
      setDiners(diners, itemCount, itemToDiner, socket, billName);
      UserStore.emitChange();
      break;
    case 'UPDATE_FROM_SERVER':
      dinerToUpdate = action.payload;
      updateDiners(dinerToUpdate);
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

