/* 
* @Author: Nathan Bailey
* @Date:   2015-05-27 10:52:07
* @Last Modified by:   Nathan Bailey
* @Last Modified time: 2015-05-27 21:53:51
*/

var React = require('react');
var AppActions = require('../actions/AppActions');

var CameraImageCapture = React.createClass({

  getInitialState: function(){
    return { data_uri: null };
  },
  _handleImage: function (e) {
    AppActions.handleImage( { file:e.target.files[0], userName: this.props.userName});
  },
  render: function() {
    var image;
   
    if(this.props.imageBeingProcessed) {
      return ( <img src="images/hex-loader2.gif"/> );
    }

    if(this.props.userName.length === 0) {
      return null;
    }

    return (
      <div>
        <div>Hi {this.props.userName} </div>
        <input ref="upload" type="file" capture="camera" accept="image/*" onChange={ this._handleImage } />
        { image }
      </div>
    );
  }
});

module.exports = CameraImageCapture;



