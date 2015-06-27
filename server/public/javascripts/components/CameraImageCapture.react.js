/* 
* @Author: Nathan Bailey
* @Date:   2015-05-27 10:52:07
* @Last Modified by:   nathanbailey
* @Last Modified time: 2015-06-26 16:33:39
*/

var React = require('react');
var AppActions = require('../actions/AppActions');

// This componenet accepts a file from the user, 
// in this case an image from the user device camera
var CameraImageCapture = React.createClass({


  // Initiates image handler action, passing file and userName
  _handleImage: function (e) {
    AppActions.handleImage({ 
      file:e.target.files[0], 
      userName: this.props.userName,
      tipPercent: this.props.tipPercent
    });
  },
  // Initiates image handler, but without image, uses demo receipt
  _handleDemo: function(){
    AppActions.handleImage({ 
      userName: this.props.userName,
      tipPercent: this.props.tipPercent
    });
  },
  render: function() {
    var image;
  
    // Hides this component if userName or tip have not been entered, or 
    // the app is in the process of loading data from the server 
    if( !this.props.userName || !this.props.tipPercent || this.props.isLoading ) {
      return null;
    }

    // display file (image) input button. OnChange, this input prompts the user
    // to upload a file, or take a picture if using a mobile device
    // If user selects "demo receipt", uses demo receipt image from server
    return (
      <div className = "image-input-wrapper">
        <p className="image-prompt"> Take a picture of your bill or use a saved image</p>
        <input className="custom-file-input" ref="upload" type="file" capture="camera" accept="image/*" onChange={ this._handleImage } />
        <button className="demo-btn btn btn-primary " onClick={ this._handleDemo }>Use demo receipt</button>
      </div>
    );
  }
});


module.exports = CameraImageCapture;


