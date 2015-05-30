/* 
* @Author: nathanbailey
* @Date:   2015-06-02 14:46:31
* @Last Modified by:   nathanbailey
* @Last Modified time: 2015-06-02 15:34:09
*/

var React = require('react');
var AppActions = require('../actions/AppActions');


var KeyValueListItem = React.createClass({

  render: function() {
    var item = this.props.item;
    var title = this.props.title.toLowerCase();

    return (
      <li key = {item.id} >
      <span className="item-description">{title}</span>
      <span className="item-cost u-pull-right">{item}</span>
      </li>
    );
  },
});

module.exports = KeyValueListItem;