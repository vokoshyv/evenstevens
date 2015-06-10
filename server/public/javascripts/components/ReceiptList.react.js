/* 
* @Author: Nathan Bailey
* @Date:   2015-05-28 15:08:02
* @Last Modified by:   nathanbailey
* @Last Modified time: 2015-06-09 20:59:01
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

            // <p className ="url-instructions"> {"Your party can interact with this bill by visiting:"}</p>

  
    return (
      <Col xs={12} className = "receipt-list">
      <div className = "party-header">
        <div className ="centered">
         <p className ="party-url"> {"evensteven.co/" + this.state.billName}</p>
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
            userTotals.length > 0 && <li className ="diner-totals"><p>Diner Totals</p>
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
