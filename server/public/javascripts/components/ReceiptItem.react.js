/* 
* @Author: Nathan Bailey
* @Date:   2015-05-29 16:00:24
* @Last Modified by:   Nathan Bailey
* @Last Modified time: 2015-06-09 16:45:17
*/

var React = require('react');
var addons =require('react/addons');
var AppActions = require('../actions/AppActions');


var ReceiptItem = React.createClass({
  getInitialState: function() {
    React.initializeTouchEvents(true);
    return null;
  },
  componentDidMount: function() {
      this.getDOMNode().onclick = function() {}
    },

  claimItem: function() {
     AppActions.toggleClaimed(this.props.index);
  },
  splitItem: function() {

  },

  render: function() {
    var item = this.props.item;
    var userName = this.props.userName;
    var claimedList = this.props.claimedBy;
    if (claimedList) {
      var claimedBy = claimedList.join(" / ");
      var indexOfClaimed = claimedList.indexOf(userName);
    }
    
    var buttonMessage;

    if (claimedBy) {
      if(indexOfClaimed === -1) {
        buttonMessage = (<div><i className="fa fa-exchange"></i> Split</div>);
      } else {
        buttonMessage = (<div><i className ="fa fa-times"></i> Cancel</div>);
      }
    } else {
      buttonMessage = (<div><i className ="fa fa-plus"></i> Add </div>);
    }

    return (
      <li className="item-li"key={item.id} >
        <div className = "claim-button pull-left" onClick = {this.claimItem}> {buttonMessage}</div>
        <div className="item-description">{item.item}</div>
        <div className="item-cost pull-right">{item.cost}</div>
        <div className = "claimed-name pull-right"> {claimedBy || null} </div>   
      </li>
    );
  },
});

module.exports = ReceiptItem;