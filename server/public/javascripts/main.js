/* 
* @Author: hal
* @Date:   2015-05-22 14:00:21
* @Last Modified by:   Nathan Bailey
* @Last Modified time: 2015-05-29 14:41:59
*/
'use strict';

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

var socket = io.connect('localhost:3000');
var url = window.location.href.split('/');
var billname = url[url.length-1];

socket.on('fromServerInitialData', function (data) {
  console.log('Server to Client', data);
});

socket.on('fromServerUpdate', function (data) {
  console.log('Server to Client', data);
});

socket.emit('userJoin', {billname: billname});
socket.emit('userFirstRun', {billname: billname});

var React = require('react');
var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var ReceiptList = require('./components/ReceiptList.react');
var SubmitReceipt = require('./components/SubmitReceipt.react');

var App = React.createClass({
  render: function() {
    return (
      <div className ="container">
      <h1 id="brand"> Even Stevens </h1>
      <RouteHandler />
      </div>
    );
  }
});


var routes = (
  <Route handler={App} path="/">
    <DefaultRoute handler = {SubmitReceipt} />
    <Route name="billPage" path="/:bill" handler={ReceiptList}/>
  </Route>
);

Router.run(routes, Router.HistoryLocation, function (Handler) {
  React.render(<Handler />, document.getElementById('content'));
});
      