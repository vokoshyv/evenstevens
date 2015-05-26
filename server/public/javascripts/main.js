/* 
* @Author: hal
* @Date:   2015-05-22 14:00:21
* @Last Modified by:   Nathan Bailey
* @Last Modified time: 2015-05-26 11:45:46
*/

'use strict';

var name;

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
  handleFile: function(e) {
    var self = this;
    var reader = new FileReader();
    var file = e.target.files[0];

    reader.onload = function(upload) {
      self.setState({data_uri: upload.target.result});
      var data = upload.target.result.replace("data:"+ file.type +";base64,", '');
      $.ajax({
        url: '/api/bills/' + name,
        type: 'POST',
        data: JSON.stringify({data:data}),
        contentType: "application/json",
        success: self.successHandler,
        error: self.errorHandler,
      });
    }
    reader.readAsDataURL(file);
    return;  
  },
  successHandler: function(){
    console.log("success");

  },
  errorHandler: function(){
    console.log("err");
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
        { this.state.showCameraBtn ? <CameraButton  />: null }
      </div>
    );
  }
});

React.render(
  <App />,
  document.getElementById('content')
);
      