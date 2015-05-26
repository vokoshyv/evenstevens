/* 
* @Author: hal
* @Date:   2015-05-22 14:00:21
* @Last Modified by:   nathanbailey
* @Last Modified time: 2015-05-25 20:48:54
*/

'use strict';

var name;
var imageData;

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
  // handleSubmit: function(e)  {  
  //   e.preventDefault();

  //   //post request from http://stackoverflow.com/questions/166221/how-can-i-upload-files-asynchronously
  //   $.ajax({
  //     url: '/api/bills/' + , // insert billName here
  //     type: 'POST',
  //     success: successHandler,
  //     error: errorHandler,
  //     // Form data
  //     data: formData, // create formData object here
  //     //Options to tell jQuery not to process data or worry about content-type.
  //     cache: false,
  //     contentType: false,
  //     processData: false
  //   });

  // },
  handleFile: function(e) {
    var self = this;
    var reader = new FileReader();
    var file = e.target.files[0];

    reader.onload = function(upload) {
      self.setState({
        data_uri: upload.target.result,
      });
      var image = upload.target.result;
      self.props.onImageCapture({image:image});
    }

    reader.readAsDataURL(file);

 
    
  },
  render: function() {
    return (
      <div>
      <form onSubmit={this.handleSubmit} encType="multipart/form-data">
        <label className="myLabel">
        <input type="file" accept="image/*;capture=camera" onChange={this.handleFile} style={{display:"none"}} />
          <span>Take a picture of receipt</span>
        </label>
      </form>
      <img src={this.state.data_uri} />
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
    // do something with input.name here
    // Send to server
    name = input.name;

    this.setState({ 
      showNameBtn   : false,
      showCameraBtn : true
    }); 
    return; 
  },
  sendData: function(data){
     
    console.log(data);

    $.ajax({
      url: '/api/bills/' + name, // insert billName here
      type: 'POST',
      dataType: 'json',
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      success: this.successHandler,
      error: this.errorHandler,
      // Form data
      data: data.image,
      //Options to tell jQuery not to process data or worry about content-type.
      cache: false,
      processData: false
    });
    return;
  },

  successHandler: function() {
    //POST upload success handler
    console.log("good");
    return;
  },
  errorHandler: function() {
    //POST upload error handler
    console.log("bad");
    return;
  },
  render: function() {
    return (
      <div className ="container">
        <h1>Even Stevens</h1>
        { this.state.showNameBtn ? <InputForm onInputSubmit = {this.handleInputSubmit}/> : null }
        { this.state.showCameraBtn ? <CameraButton onImageCapture = {this.sendData} />: null }
      </div>
    );
  }
});

React.render(
  <App />,
  document.getElementById('content')
);
      