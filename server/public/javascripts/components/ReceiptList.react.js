/* 
* @Author: Nathan Bailey
* @Date:   2015-05-28 15:08:02
* @Last Modified by:   Nathan Bailey
* @Last Modified time: 2015-05-29 19:39:49
*/

var React = require('react');
var UserStore = require('../stores/AppStore');
var ReceiptStore = require('../stores/ReceiptStore');
var ReceiptItem = require('./ReceiptItem.react');


var getReceiptState = function() {
  return {
     receiptObj: ReceiptStore.getReceiptObj()
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
    console.log("allItems ", allItems);

    for(var key in allItems) {
      var isClaimed = true;
      items.push(<ReceiptItem key={key} item={allItems[key]} isClaimed={isClaimed} />);
    }
    console.log("items array ", items);

    return (
      <div className = "bill-details">
        <h4>Receipt for {this.state.receiptObj.billName}</h4>
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