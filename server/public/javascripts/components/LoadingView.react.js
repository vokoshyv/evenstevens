/* 
* @Author: Nathan Bailey
* @Date:   2015-05-30 15:35:15
* @Last Modified by:   nathanbailey
* @Last Modified time: 2015-06-13 16:11:24
*/

var React = require('react');

// This component displays a blank loading screen with a 
// loading message
var LoadingView = React.createClass({
  render: function(){
    if(this.props.isLoading) {
      return (<div className="loading-msg"> Scanning your bill...</div>);
    } else {
      return null;
    }
  }
});

module.exports = LoadingView

