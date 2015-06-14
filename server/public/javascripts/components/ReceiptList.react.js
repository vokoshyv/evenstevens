/* 
* @Author: Nathan Bailey
* @Date:   2015-05-28 15:08:02
* @Last Modified by:   nathanbailey
* @Last Modified time: 2015-06-13 16:28:52
*/

var React = require('react');
var AppStore = require('../stores/AppStore');
var ReceiptItem = require('./ReceiptItem.react');
var TotalsItem = require('./TotalsItem.react');
var NameInputForm = require('./NameInputForm.react');
var AppActions = require('../actions/AppActions') ;
var Col = require('react-bootstrap').Col;
var LoadingView = require('./LoadingView.react');
var addons =require('react/addons');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var getReceiptState = function() {
  return {
    billName: AppStore.getBillName(),
    items: AppStore.getItems(),
    totals: AppStore.getTotals(),
    currentUserName: AppStore.getUserName(),
    itemToDiner: AppStore.getItemToDiner(),
    userTotals: AppStore.getUserTotals(),
    tipValue: AppStore.getTipValue(),
    isAllClaimed: AppStore.getIsAllClaimed()
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

    // loading
    if(this.state.itemToDiner.length === 0) {
      return (<LoadingView  isLoading={true} />);
    }

    var totalListItems = [];
    var claimedItems = this.state.itemToDiner;
    var currentUserName = this.state.currentUserName
    var userTotals = [];
    
    for(var key in this.state.totals) {
      totalListItems.push(<TotalsItem key={key} title={key} item={this.state.totals[key]} tipValue={this.state.tipValue} />);
    }   

    for(var name in this.state.userTotals) {
      userTotals.push(<TotalsItem key ={name} title={name} item={this.state.userTotals[name]} />);
    }

    return ( 
      <Col xs={12} className = "receipt-list">
      {this.state.isAllClaimed && <div className = "all-Claimed show">All items claimed!</div> }
      <div className = "party-header">
        <div className ="centered">
         <p className ="party-url"> {"evenstevens.co/" + this.state.billName}</p>
         </div>
      </div>
        <ul className ="receipt-lists">
          <li>
            <ul className="item-list"> {
                this.state.items.map(function(value, index) {
                  return <ReceiptItem key={index} index={index} userName={currentUserName} claimedBy={claimedItems[index]} item={value}  />;
                })}
           
            </ul>
          </li>
          {
            userTotals.length > 0 && <li className ="diner-totals">
              <p>Diner Totals</p>
              <p className = "tax-tip-message">( tax and tip included )</p>
                <ul className="user-summary">{ userTotals } </ul>
            </li>
          } 
          <li className = "receipt-totals"><p>Receipt Totals</p>
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
