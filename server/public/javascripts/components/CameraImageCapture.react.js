/* 
* @Author: Nathan Bailey
* @Date:   2015-05-27 10:52:07
* @Last Modified by:   Nathan Bailey
* @Last Modified time: 2015-05-27 16:30:16
*/

var React = require('react');
var AppActions = require('../actions/AppActions');

var CameraImageCapture = React.createClass({

  getInitialState: function(){
    return { data_uri: null };
  },
  handleSubmit: function(e)  {  
    e.preventDefault();

    //post request from http://stackoverflow.com/questions/166221/how-can-i-upload-files-asynchronously
    $.ajax({
      url: '/api/bills/' + '', // insert billName here
      type: 'POST',
      success: successHandler,
      error: errorHandler,
      // Form data
      data: formData, // create formData object here
      //Options to tell jQuery not to process data or worry about content-type.
      cache: false,
      contentType: false,
      processData: false
    });

  },

  _onChange: function (e) {

      AppActions.handleImage(e.target.files);

    var files = e.target.files;
    var formData = new FormData();
    var xhr = new XMLHttpRequest();

    formData.append('file', files[0]);    
    xhr.open('POST', '/api/bills/' + name);
    xhr.onload = function () {
      if (xhr.status === 200) {
        console.log('all done: ' + xhr.status);
      } else {
        console.log('Something went terribly wrong...');
      }
    };

    xhr.send(formData);
  },

  render: function() {
    var image;
    var dataUrl = this.state.dataUrl;
    if (dataUrl) {
      image = <img src={dataUrl} />
    }

    return (
      <div>
        <input ref="upload" type="file" capture="camera" accept="image/*" onChange={ this._onChange } />
        { image }
      </div>
    );
  }
});

module.exports = CameraImageCapture;



