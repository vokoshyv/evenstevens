/* 
* @Author: Nathan Bailey
* @Date:   2015-05-28 15:08:02
* @Last Modified by:   nathanbailey
* @Last Modified time: 2015-06-02 15:34:00
*/

var React = require('react');
var UserStore = require('../stores/UserStore');
var ReceiptStore = require('../stores/ReceiptStore');
var ReceiptItem = require('./ReceiptItem.react');
var KeyValueListItem = require('./KeyValueListItem.react');
var NameInputForm = require('./NameInputForm.react');
var AppActions = require('../actions/AppActions') ;

var getReceiptState = function() {
  return {
    billName: ReceiptStore.getBillName(),
    items: ReceiptStore.getItems(),
    totals: ReceiptStore.getTotals(),
    currentUserName: UserStore.getUserName(),
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

    // if username not set, prompt for username input
    if (!this.state.currentUserName) {
      return ( <NameInputForm joinRoom={true} userName={this.state.currentUserName} />);
    }

    var totalListItems = [];

    for(var key in this.state.totals) {
      totalListItems.push(<KeyValueListItem key ={key} title={key} item={this.state.totals[key]} />);
    }   
   
    return (
      <div className = "bill-details">
        <h4 className ="centered">{this.state.billName + "'s receipt"}</h4>
        <p className ="centered">{"Currently claiming for " + this.state.currentUserName} </p>
        <ul id="item-list"> {
            this.state.items.map(function(value, index) {
              return <ReceiptItem key={index} item={value} isClaimed={false} />;
            })}
        </ul>
        <ul id="totals-list"> { totalListItems } </ul>
      </div> 
    );
  }, 
  _onChange: function() {
    this.setState(getReceiptState());
  }

});

module.exports = ReceiptList;


    // <li>Subtotal    <span className="u-pull-right">{this.state.receiptObj.receipt.subTotal}</span></li>
    //       <li>Tax         <span className="u-pull-right">{this.state.receiptObj.receipt.tax}</span></li>
    //       <li>Total       <span className="u-pull-right">{this.state.receiptObj.receipt.total}</span></li>
    //       <li>Tip         <span className="u-pull-right">{this.state.receiptObj.receipt.tip}</span></li>
    //       <li>Grand Total <span className="u-pull-right">{this.state.receiptObj.receipt.grandTotal}</span></li>