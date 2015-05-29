/* 
* @Author: Nathan Bailey
* @Date:   2015-05-28 15:08:02
* @Last Modified by:   Nathan Bailey
* @Last Modified time: 2015-05-28 17:02:58
*/

var React = require('react');
var AppActions = require('../actions/AppActions');


var ReceiptList = React.createClass({
componentDidMount: function() {

},
 render: function(){
  console.log(Object.keys(this.props.receiptItems).length );
    if (Object.keys(this.props.receiptItems).length < 1) {
      return null;
    } 

    return (<div> HURRAY </div>);
 }

});

module.exports = ReceiptList;