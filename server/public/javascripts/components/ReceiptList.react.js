/* 
* @Author: Nathan Bailey
* @Date:   2015-05-28 15:08:02
* @Last Modified by:   Nathan Bailey
* @Last Modified time: 2015-05-29 13:26:08
*/

var React = require('react');
var UserStore = require('../stores/AppStore');
var ReceiptStore = require('../stores/ReceiptStore');


var getReceiptState = function() {
  return {
     receiptObj: ReceiptStore.getReceiptItems()
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
    

    return (
      <div className = "bill-details">
      <h2>Bill for {this.state.receiptObj.billName} </h2>
      <ul> 
        <li> {this.state.receiptObj.receipt.items[0].item} {this.state.receiptObj.receipt.items[0].cost} </li>
        <li> {this.state.receiptObj.receipt.items[1].item} {this.state.receiptObj.receipt.items[1].cost} </li>
        <li> {this.state.receiptObj.receipt.items[2].item} {this.state.receiptObj.receipt.items[2].cost} </li>
        <li> {this.state.receiptObj.receipt.items[3].item} {this.state.receiptObj.receipt.items[3].cost} </li>    
      </ul>
      <ul>
          <li>Subtotal   : {this.state.receiptObj.receipt.subTotal} </li>
          <li>Tax        : {this.state.receiptObj.receipt.tax} </li>
          <li>Total      : {this.state.receiptObj.receipt.total} </li>
          <li>Tip        : {this.state.receiptObj.receipt.tip} </li>
          <li>Grand Total: {this.state.receiptObj.receipt.grandTotal} </li>
      </ul>
       </div>);
  },

    // <li> {this.state.receiptObj.items[1]}</li>
        // <li> {this.state.receiptObj.items[2]}</li>
        // <li> {this.state.receiptObj.items[3]}</li>
        // <li> {this.state.receiptObj.items[4]}</li>  
  _onChange: function() {
    this.setState(getReceiptState());
  }

});

module.exports = ReceiptList;