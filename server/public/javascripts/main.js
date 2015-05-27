/* 
* @Author: hal
* @Date:   2015-05-22 14:00:21
* @Last Modified by:   vokoshyv
* @Last Modified time: 2015-05-26 21:24:16
*/

'use strict';

var name;

/**
 * resizing function
 */
// function resize (file, maxWidth, maxHeight, fn) {
//     var reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = function (event) {
//         var dataUrl = event.target.result;
//         var image = new Image();
//         image.src = dataUrl;
//         image.onload = function () {
//             var resizedDataUrl = resizeImage(image, maxWidth, maxHeight, 0.7);
//             fn(resizedDataUrl);
//         };
//     };
// };
 
/**
 * resizing function
 */ 
// function resizeImage(image, maxWidth, maxHeight, quality) {
//     var canvas = document.createElement('canvas');
 
//     var width = image.width;
//     var height = image.height;
 
//     if (width > height) {
//       if (width > maxWidth) {
//         height = Math.round(height * maxWidth / width);
//         width = maxWidth;
//       }
//     } else {
//       if (height > max_height) {
//         width = Math.round(width * maxHeight / height);
//         height = maxHeight;
//       }
//     }
 
//     canvas.width = width;
//     canvas.height = height;
 
//     var ctx = canvas.getContext("2d");
//     ctx.drawImage(image, 0, 0, width, height);
//     return canvas.toDataURL("image/jpeg", quality);
// };

var socketClient = SocketClient('http://127.0.0.1:3000');
socketClient.send({value: 'hello'});

var InputForm = React.createClass({
  getInitialState: function(){
    return {message: ""};
  },
  handleInput: function(e){
    e.preventDefault();
    var name = React.findDOMNode(this.refs.name).value.trim();
    if(!name) {
      this.setState({message:"Please enter your name"});
      return;
    }
    this.setState({message:""});
    this.props.onInputSubmit({name:name});
    React.findDOMNode(this.refs.name).value = '';
    return;
  },
  render: function() {
    return (
      <form className ="inputForm" onSubmit={this.handleInput}>
        <input type="text" placeholder="Enter your name" ref="name" />
        <input type="submit" value="Keep it even" />
        <div className ="errorBox"> {this.state.message}</div>
      </form>
    );
  }
});

var CameraButton = React.createClass({

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

var App= React.createClass({
  getInitialState: function() {
    return { 
      showNameBtn   : true,
      showCameraBtn : false
    };
  },
  handleInputSubmit: function(input){
    name = input.name;

    this.setState({ 
      showNameBtn   : false,
      showCameraBtn : true
    }); 
    return; 
  },
  render: function() {
    return (
      <div className ="container">
        <h1>Even Stevens</h1>
        { this.state.showNameBtn ? <InputForm onInputSubmit = {this.handleInputSubmit}/> : null }
        { this.state.showCameraBtn ? <CameraButton maxHeight={500} maxWidth={500}  />: null }
      </div>
    );
  }
});

React.render(
  <App />,
  document.getElementById('content')
);
      