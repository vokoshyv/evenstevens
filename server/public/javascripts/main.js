/* 
* @Author: hal
* @Date:   2015-05-22 14:00:21
* @Last Modified by:   Nathan Bailey
* @Last Modified time: 2015-05-26 12:38:34
*/

'use strict';

var name;

function resize (file, maxWidth, maxHeight, fn) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (event) {
        var dataUrl = event.target.result;
 
        var image = new Image();
        image.src = dataUrl;
        image.onload = function () {
            var resizedDataUrl = resizeImage(image, maxWidth, maxHeight, 0.7);
            fn(resizedDataUrl);
        };
    };
};
 
function resizeImage(image, maxWidth, maxHeight, quality) {
    var canvas = document.createElement('canvas');
 
    var width = image.width;
    var height = image.height;
 
    if (width > height) {
        if (width > maxWidth) {
            height = Math.round(height * maxWidth / width);
            width = maxWidth;
        }
    } else {
        if (height > max_height) {
            width = Math.round(width * maxHeight / height);
            height = maxHeight;
        }
    }
 
    canvas.width = width;
    canvas.height = height;
 
    var ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0, width, height);
    return canvas.toDataURL("image/jpeg", quality);
};

function sendImage(dataUrl){
  console.log(dataUrl);
  $.ajax({
    url: '/api/bills/' + name,
    type: 'POST',
    data: JSON.stringify({data:dataUrl}),
    contentType: "application/json",
    success: successHandler,
    error: errorHandler,
  });
};

function successHandler(){
  console.log("yay");
}

function errorHandler(){
  console.log("boo");
}

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
  getInitialState: function () {
      return {};
    },
  _onChange: function (e) {
      var files = e.target.files;
      var self = this;
      var maxWidth = this.props.maxWidth;
      var maxHeight = this.props.maxHeight;
      resize(files[0], maxWidth, maxHeight, function (resizedDataUrl) {
        sendImage(resizedDataUrl);
        self.setState({ dataUrl: resizedDataUrl });
      });
  },

  // handleFile: function(e) {
  //   var self = this;
  //   var reader = new FileReader();
  //   var file = e.target.files[0];

  //   reader.onload = function(upload) {
  //     self.setState({data_uri: upload.target.result});
  //     var data = upload.target.result.replace("data:"+ file.type +";base64,", '');
  //     $.ajax({
  //       url: '/api/bills/' + name,
  //       type: 'POST',
  //       data: JSON.stringify({data:data}),
  //       contentType: "application/json",
  //       success: self.successHandler,
  //       error: self.errorHandler,
  //     });
  //   }
  //   reader.readAsDataURL(file);
  //   return;  
  // },
  successHandler: function(){
    console.log("success");

  },
  errorHandler: function(){
    console.log("err");
  },

  render: function() {
    var image;
 
    var dataUrl = this.state.dataUrl;
      if (dataUrl) {
        image = <img src={dataUrl} />
      }


    return (
    <div>
        <input ref="upload" type="file" accept="image/*" onChange={ this._onChange }/>
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
    _onChange: function (file) {
        console.log('done', file);
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
        { this.state.showCameraBtn ? <CameraButton maxHeight={100} maxWidth={100} onChange={ this._onChange }  />: null }
      </div>
    );
  }
});

React.render(
  <App />,
  document.getElementById('content')
);
      