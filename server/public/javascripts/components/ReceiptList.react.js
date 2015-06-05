/* 
* @Author: Nathan Bailey
* @Date:   2015-05-28 15:08:02
* @Last Modified by:   nathanbailey
* @Last Modified time: 2015-06-04 19:41:11
*/

var React = require('react');
var UserStore = require('../stores/UserStore');
var ReceiptStore = require('../stores/ReceiptStore');
var ReceiptItem = require('./ReceiptItem.react');
var KeyValueListItem = require('./KeyValueListItem.react');
var NameInputForm = require('./NameInputForm.react');
var AppActions = require('../actions/AppActions') ;
var Col = require('react-bootstrap').Col;

var getReceiptState = function() {
  return {
    billName: ReceiptStore.getBillName(),
    items: ReceiptStore.getItems(),
    totals: ReceiptStore.getTotals(),
    currentUserName: UserStore.getUserName(),
    itemToDiner: UserStore.getItemToDiner(),
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
    var claimedItems = this.state.itemToDiner;
    var currentUserName = this.state.currentUserName;
    

    for(var key in this.state.totals) {
      totalListItems.push(<KeyValueListItem key ={key} title={key} item={this.state.totals[key]} />);
    }   
  
    return (
      <Col xs={12} className = "receipt-list">
      <div className = "party-header">
        <div className ="centered">{"evensteven.co/" + this.state.billName}</div>
      </div>

        <ul className="item-list"> {
            this.state.items.map(function(value, index) {
              return <ReceiptItem key={index} index={index} userName={currentUserName} claimedBy={claimedItems[index]} item={value}  />;
            })}
       
        </ul>
        <ul className="totals-list"> { totalListItems } </ul>
      
      </Col> 
    );
  }, 
  _onChange: function() {
    this.setState(getReceiptState());
  }

});

module.exports = ReceiptList;

   // <Accordion>
   //        <Panel header='Collapsible Group Item #1' eventKey='1'>
   //          derp1
   //        </Panel>
   //        <Panel header='Collapsible Group Item #2' eventKey='2'>
   //          derp2
   //        </Panel>
   //        <Panel header='Collapsible Group Item #3' eventKey='3'>
   //          derp3
   //        </Panel>
   //      </Accordion>
// 
// 
// 
// 


    // <li>Subtotal    <span className="u-pull-right">{this.state.receiptObj.receipt.subTotal}</span></li>
    //       <li>Tax         <span className="u-pull-right">{this.state.receiptObj.receipt.tax}</span></li>
    //       <li>Total       <span className="u-pull-right">{this.state.receiptObj.receipt.total}</span></li>
    //       <li>Tip         <span className="u-pull-right">{this.state.receiptObj.receipt.tip}</span></li>
    //       <li>Grand Total <span className="u-pull-right">{this.state.receiptObj.receipt.grandTotal}</span></li>