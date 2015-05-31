/* 
* @Author: Nathan Bailey
* @Date:   2015-05-28 15:08:02
* @Last Modified by:   Nathan Bailey
* @Last Modified time: 2015-05-30 17:03:07
*/

var React = require('react');
var UserStore = require('../stores/UserStore');
var ReceiptStore = require('../stores/ReceiptStore');
var ReceiptItem = require('./ReceiptItem.react');
var NameInputForm = require('./NameInputForm.react');


var getReceiptState = function() {
  return {
    billName: ReceiptStore.getBillName(),
    receiptObj: ReceiptStore.getReceiptObj(),
    currentUserName: UserStore.getUserName()
  }
};

var ReceiptList = React.createClass({
  getInitialState: function() {
    return getReceiptState();
  },

  componentDidMount: function() {
    UserStore.addChangeListener(this._onChange);
    ReceiptStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    UserStore.removeChangeListener(this._onChange);
    ReceiptStore.removeChangeListener(this._onChange);
  },

  render: function(){
    if (Object.keys(this.state.receiptObj).length < 1) {
      return null;
    }

    var allItems = this.state.receiptObj.receipt.items;
    var items = [];
   

    for(var key in allItems) {
      var isClaimed = true;
      items.push(<ReceiptItem key={key} item={allItems[key]} isClaimed={isClaimed} />);
    }
  
    if (this.state.currentUserName.length === 0) {
      return ( <NameInputForm userName={this.state.currentUserName} />);
    }

    return (
      <div className = "bill-details">
        <h4 className ="centered">{this.state.billName + "'s receipt"}</h4>
        <p className ="centered">{"Currently claiming for " + this.state.currentUserName} </p>
        <ul id="item-list">{items}</ul>
        <ul id="totals-list">
          <li>Subtotal    <span className="u-pull-right">{this.state.receiptObj.receipt.subTotal}</span></li>
          <li>Tax         <span className="u-pull-right">{this.state.receiptObj.receipt.tax}</span></li>
          <li>Total       <span className="u-pull-right">{this.state.receiptObj.receipt.total}</span></li>
          <li>Tip         <span className="u-pull-right">{this.state.receiptObj.receipt.tip}</span></li>
          <li>Grand Total <span className="u-pull-right">{this.state.receiptObj.receipt.grandTotal}</span></li>
        </ul>
      </div> 
    );
  }, 
  _onChange: function() {
    this.setState(getReceiptState());
  }

});

module.exports = ReceiptList;