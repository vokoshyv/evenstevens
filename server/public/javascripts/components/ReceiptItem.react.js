/* 
* @Author: Nathan Bailey
* @Date:   2015-05-29 16:00:24
* @Last Modified by:   nathanbailey
* @Last Modified time: 2015-06-04 20:23:53
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
    
  

    var buttonMessage = "";

    if (claimedBy) {
      if(indexOfClaimed === -1) {
        buttonMessage = "Split";
      } else {
        buttonMessage = "Cancel";
      }
    } else {
      buttonMessage = "Claim"
    }

    return (
      <li className="item-li"key={item.id} >

        <div className="item-description">{item.item}</div>
            <div className="checked">{claimedBy && <span> &#10003;</span>}</div>
        <div className="item-cost ">{item.cost}</div>
      
      <div className="clearfix"></div>
      <div className="claimed-by">
          <div className = "claim-button btn btn-default pull-left" onClick = {this.claimItem}> {buttonMessage}</div>
          <div className = "claimed-name pull-right"> {claimedBy || "Not Claimed"} </div>
      </div>
      </li>
    );
  },
});

module.exports = ReceiptItem;