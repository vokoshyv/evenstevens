/* 
* @Author: Nathan Bailey
* @Date:   2015-05-29 16:00:24
* @Last Modified by:   Nathan Bailey
* @Last Modified time: 2015-06-12 14:14:11
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
        buttonMessage = (<div><span className="button-char split">&#x21c4;</span></div>);
      } else {
        buttonMessage = (<div><span className="button-char minus-char ">-</span></div>);
      }
    } else {
      buttonMessage = (<div><span className="button-char plus-char ">+</span></div>);
    }

    return (
      <li className="item-li"key={item.id}   onClick = {this.claimItem}>
        <div className = "claim-button pull-left"> {buttonMessage}</div>
        <div className="item-description">{item.item}</div>
        <div className="item-cost">{item.cost}</div>
        <div className = "claimed-name"> {claimedBy || null} </div>   
      </li>
    );
  },
});

module.exports = ReceiptItem;