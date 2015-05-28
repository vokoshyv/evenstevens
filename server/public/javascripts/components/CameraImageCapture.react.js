/* 
* @Author: Nathan Bailey
* @Date:   2015-05-27 10:52:07
* @Last Modified by:   Nathan Bailey
* @Last Modified time: 2015-05-27 16:55:03
*/

var React = require('react');
var AppActions = require('../actions/AppActions');

var CameraImageCapture = React.createClass({

  getInitialState: function(){
    return { data_uri: null };
  },
  _handleImage: function (e) {
    AppActions.handleImage(e.target.files[0]);
  },

  render: function() {
    var image;
    var dataUrl = this.state.dataUrl;
    if (dataUrl) {
      image = <img src={dataUrl} />
    }

    return (
      <div>
        <input ref="upload" type="file" capture="camera" accept="image/*" onChange={ this._handleImage } />
        { image }
      </div>
    );
  }
});

module.exports = CameraImageCapture;



