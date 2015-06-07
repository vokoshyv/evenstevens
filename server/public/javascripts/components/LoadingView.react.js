/* 
* @Author: Nathan Bailey
* @Date:   2015-05-30 15:35:15
* @Last Modified by:   nathanbailey
* @Last Modified time: 2015-06-06 15:06:00
*/

var React = require('react');

var LoadingView = React.createClass({
  render: function(){
    if(this.props.isLoading) {
      return ( <div className = "u-full-width">
                  <div className="u-max-full-width loading-msg"> keeping it even...</div>
                </div> );
    } else {
      return null;
    }
  }
});

module.exports = LoadingView

