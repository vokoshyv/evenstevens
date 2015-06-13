/* 
* @Author: Nathan Bailey
* @Date:   2015-05-27 10:52:07
* @Last Modified by:   nathanbailey
* @Last Modified time: 2015-06-13 11:05:49
*/

var React = require('react');
var AppActions = require('../actions/AppActions');

// This componenet accepts a file from the user, 
// in this case an image from the user device camera
var CameraImageCapture = React.createClass({


  // Initiate image handler action, passing file and userName
  _handleImage: function (e) {
    this.setState({isLoading: true});

    // console.log(e.target.files[0]);
    // var file = e.target.files[0];

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
    if( !this.props.userName || !this.props.tipPercent || this.props.isLoading ) {
      return null;
    }

    // display file input button
    return (
      <div className = "image-input-wrapper">
        <p className="image-prompt"> Take a picture of your bill or use a saved image</p>
        <input className="custom-file-input" ref="upload" type="file" capture="camera" accept="image/*" onChange={ this._handleImage } />
      </div>
    );
  }
});

      //  <input className="custom-file-input2" ref="upload" type="file" capture="camera" accept="image/*" onChange={ this._handleImage } />


module.exports = CameraImageCapture;


