/* 
* @Author: Nathan Bailey
* @Date:   2015-05-28 15:08:02
* @Last Modified by:   nathanbailey
* @Last Modified time: 2015-06-06 09:46:01
*/

var React = require('react');
var AppStore = require('../stores/AppStore');
var ReceiptItem = require('./ReceiptItem.react');
var KeyValueListItem = require('./KeyValueListItem.react');
var NameInputForm = require('./NameInputForm.react');
var AppActions = require('../actions/AppActions') ;
var Col = require('react-bootstrap').Col;

var getReceiptState = function() {
  return {
    billName: AppStore.getBillName(),
    items: AppStore.getItems(),
    totals: AppStore.getTotals(),
    currentUserName: AppStore.getUserName(),
    itemToDiner: AppStore.getItemToDiner(),
    userTotals: AppStore.getUserTotals()
  }
};

var ReceiptList = React.createClass({
  getInitialState: function() {
    return getReceiptState();
  },
  componentDidMount: function() {
    AppStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    AppStore.removeChangeListener(this._onChange);
  },

  render: function(){
    // if username not set, prompt for username input
    if (!this.state.currentUserName) {
      return ( <NameInputForm joinRoom={true} userName={this.state.currentUserName} />);
    }

    var totalListItems = [];
    var claimedItems = this.state.itemToDiner;
    var currentUserName = this.state.currentUserName
    var userTotals = [];
    

    for(var key in this.state.totals) {
      totalListItems.push(<KeyValueListItem key ={key} title={key} item={this.state.totals[key]} />);
    }   

    for(var name in this.state.userTotals) {
      userTotals.push(<KeyValueListItem key ={name} title ={name} item={this.state.userTotals[name]} />);
    }
  
    return (
      <Col xs={12} className = "receipt-list">
      <div className = "party-header">
        <div className ="centered"> {"evensteven.co/" + this.state.billName} </div>
      </div>
        <ul>
          <li>
            <ul className="item-list"> {
                this.state.items.map(function(value, index) {
                  return <ReceiptItem key={index} index={index} userName={currentUserName} claimedBy={claimedItems[index]} item={value}  />;
                })}
           
            </ul>
          </li>
          <li> Diner Totals 
            <ul className="user-summary">{ userTotals } </ul>
          </li>
          <li> Receipt Totals
            <ul className="totals-list"> { totalListItems } </ul>
          </li>
        </ul>
      </Col> 
    );
  }, 
  _onChange: function() {
    this.setState(getReceiptState());
  }

});

module.exports = ReceiptList;
