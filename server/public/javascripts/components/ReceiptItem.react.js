/* 
* @Author: Nathan Bailey
* @Date:   2015-05-29 16:00:24
* @Last Modified by:   nathanbailey
* @Last Modified time: 2015-06-02 14:59:01
*/

var React = require('react');
var AppActions = require('../actions/AppActions');


var ReceiptItem = React.createClass({
  handleClick: function() {
    console.log("this!!!");
  },
  render: function() {
    var item = this.props.item;
    var classString = "item-li";
    if(this.props.isClaimed) {
      classString += ' item-claimed';
    }
    return (
      <li onClick ={this.handleClick} className={classString} key={item.id} >
      <span className="item-description">{item.item}</span>
      <span className="item-cost u-pull-right">{item.cost}</span>
      </li>

    );
  },
});

module.exports = ReceiptItem;