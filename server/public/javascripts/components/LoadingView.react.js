/* 
* @Author: Nathan Bailey
* @Date:   2015-05-30 15:35:15
* @Last Modified by:   Nathan Bailey
* @Last Modified time: 2015-05-30 15:49:47
*/

var React = require('react');

var LoadingView = React.createClass({
  render: function(){
    if(this.props.isLoading) {
      return ( <div className = "u-full-width">
                  <img className="u-max-full-width " src="images/hex-loader2.gif"/>
                  <div className="u-max-full-width loading-msg"> keeping it even...</div>
                </div> );
    } else {
      return null;
    }
  }
});

module.exports = LoadingView

