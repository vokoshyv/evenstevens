/* 
* @Author: hal
* @Date:   2015-05-22 14:00:21
* @Last Modified by:   Nathan Bailey
* @Last Modified time: 2015-05-23 17:37:11
*/

'use strict';


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
  },
  handleFile: function(e) {
    var self = this;
    var reader = new FileReader();
    var file = e.target.files[0];

    reader.onload = function(upload) {
      self.setState({
        data_uri: upload.target.result,
      });
    }
    
    reader.readAsDataURL(file);
    console.log(reader);
  },
  render: function() {
    return (
      <form onSubmit={this.handleSubmit} encType="multipart/form-data">
        <label className="myLabel">
        <input type="file" accept="image/*;capture=camera" onChange={this.handleFile} style={{display:"none"}} />
          <span>My Label</span>
        </label>
      </form>
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
    this.setState({ 
      showNameBtn   : false,
      showCameraBtn : true
    }); 
    return; 
  },
  sendImage: function(imagePath){
    console.log(imagePath);
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
      