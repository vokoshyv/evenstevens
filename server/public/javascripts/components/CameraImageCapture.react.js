/* 
* @Author: Nathan Bailey
* @Date:   2015-05-27 10:52:07
* @Last Modified by:   nathanbailey
* @Last Modified time: 2015-06-08 12:02:15
*/

var React = require('react');
var AppActions = require('../actions/AppActions');

// This componenet accepts a file from the user, 
// in this case an image from the user device camera
var CameraImageCapture = React.createClass({
  // Initiate image handler action, passing file and userName
  _handleImage: function (e) {
    AppActions.handleImage({ 
      file:e.target.files[0], 
      userName: this.props.userName,
      tipPercent: this.props.tipPercent
    });
  },
  // draw dat div
  render: function() {
    var image;
  
    // hide this component while the user is inputing
    // name
    if(!this.props.userName || !this.props.tipPercent || this.props.isLoading) {
      return null;
    }

    // display file input button
    return (
      <input ref="upload" type="file" capture="camera" accept="image/*" onChange={ this._handleImage } />
    );
  }
});

module.exports = CameraImageCapture;


