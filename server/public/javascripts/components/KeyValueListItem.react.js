/* 
* @Author: nathanbailey
* @Date:   2015-06-02 14:46:31
* @Last Modified by:   nathanbailey
* @Last Modified time: 2015-06-06 10:22:46
*/

var React = require('react');
var AppActions = require('../actions/AppActions');


var KeyValueListItem = React.createClass({

  render: function() {
    var cost = this.props.item;
    var title = this.props.title.toLowerCase();

    return (
      <li className = "totals-li" key = {cost.id} >
      <div className="cost-desc ">{title}</div>
      <div className="item-cost ">{cost.toFixed(2)}</div>
      </li>
    );
  },
});

module.exports = KeyValueListItem;