/* 
* @Author: hal
* @Date:   2015-05-22 14:00:21
* @Last Modified by:   Michael Harris
* @Last Modified time: 2015-05-28 19:32:27
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

var SocketClient = require('../javascripts/socketClient');

console.log('main.js initiate socketClient');
var socketClient = SocketClient('http://7c534c2c.ngrok.com');

setTimeout(function(){
  var data = {clientData:'someNewData'};
  socketClient.send(data);
}, 2000);

setTimeout(function(){
  var data = {clientData:'someOtherData'};
  socketClient.send(data);
}, 4000);

var React = require('react');

var EvenStevensApp = require('./components/eStevensApp.react.js')

React.render(
  <EvenStevensApp />,
  document.getElementById('content')
);



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

// uncomment when browserify is configured
// var React = require('react');
// 
// var eStevensApp = require('./components/eStevensApp.react')
// 
// 

var React = require('react');
var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var EvenStevensApp = require('./components/eStevensApp.react.js')

var routes = (
  <Route handler={EvenStevensApp} path="/">
    <Route path="/:bill" handler={EvenStevensApp}/>
  </Route>
);

Router.run(routes, Router.HistoryLocation, function (Handler) {
  React.render(<Handler />, document.getElementById('content'));
});

//var socketClient = SocketClient('http://127.0.0.1:3000');

 





      