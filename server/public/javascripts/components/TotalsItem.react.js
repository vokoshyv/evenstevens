/* 
* @Author: nathanbailey
* @Date:   2015-06-02 14:46:31
* @Last Modified by:   nathanbailey
* @Last Modified time: 2015-06-13 16:09:39
*/

var React = require('react');
var AppActions = require('../actions/AppActions');

// This component is used to create list items for both
// the Receipt totals and the Diner totals lists.
var TotalsItem = React.createClass({
  render: function() {
    var cost = this.props.item;
    var title = this.props.title.toLowerCase();
    if(title === "tip") {
      cost = ("(" + cost + ") " + this.props.tipValue);
    }

    return (
      <li className = "totals-li">
      <div className="cost-desc ">{title}</div>
      <div className="item-cost ">{cost}</div>
      </li>
    );
  },
});

module.exports = TotalsItem;