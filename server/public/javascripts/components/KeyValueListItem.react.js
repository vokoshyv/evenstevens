/* 
* @Author: nathanbailey
* @Date:   2015-06-02 14:46:31
* @Last Modified by:   Nathan Bailey
* @Last Modified time: 2015-06-12 15:19:56
*/

var React = require('react');
var AppActions = require('../actions/AppActions');


var KeyValueListItem = React.createClass({

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

module.exports = KeyValueListItem;