/* 
* @Author: Nathan Bailey
* @Date:   2015-05-29 16:00:24
* @Last Modified by:   nathanbailey
* @Last Modified time: 2015-06-13 11:42:28
*/

var React = require('react');
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
     // React.findDOMNode(this.refs.listItem).focus();
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
    var classString = "item-li";

    if (claimedBy) {
      classString += " claimed";
      if(indexOfClaimed === -1) {
        buttonMessage = (<div><span className="button-char split">&#x21c4;</span></div>);
      } else {
        buttonMessage = (<div><span className="button-char minus-char ">-</span></div>);
      }
    } else {
      buttonMessage = (<div><span className="button-char plus-char ">+</span></div>);
    }

    return (
      <li className={classString} key={item.id} ref="listItem"  onClick = {this.claimItem}>
        <div className = "claim-button pull-left"> {buttonMessage}</div>
        <div className="item-description">{item.item}</div>
        <div className="item-cost">{item.cost}</div>
        <div className = "claimed-name"> {claimedBy || null} </div>   
      </li>
    );
  },
});

module.exports = ReceiptItem;