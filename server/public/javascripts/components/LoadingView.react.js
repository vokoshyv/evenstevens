/* 
* @Author: Nathan Bailey
* @Date:   2015-05-30 15:35:15
* @Last Modified by:   Nathan Bailey
* @Last Modified time: 2015-06-12 15:07:32
*/

var React = require('react');

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

