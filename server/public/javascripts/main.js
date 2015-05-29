/* 
* @Author: hal
* @Date:   2015-05-22 14:00:21
<<<<<<< HEAD
* @Last Modified by:   Michael Harris
* @Last Modified time: 2015-05-29 15:46:58
=======
* @Last Modified by:   Michael Harris
* @Last Modified time: 2015-05-29 15:26:36
>>>>>>> (feat) Add update data event with dummy data to trigger update event on server
*/
'use strict';

// This file is the main entry point for browserify
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

// var updateData = {
//   "diners": [{
//     "diner": 0,
//     "itemIndex": [0, 4, 2]
//   }]
// };

// socket.emit('userUpdate', {billname: billname, updateData: updateData } );

// React requires
var React = require('react');
var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

// Components for two routes
var ReceiptList = require('./components/ReceiptList.react');
var SubmitReceipt = require('./components/SubmitReceipt.react');
var EvenStevensApp = require('./components/eStevensApp.react.js');

React.render(
  <EvenStevensApp />,
  document.getElementById('content')
);

// Main container component, all other components nest inside
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

// Routing!
var routes = (
  <Route handler={App} path="/">
    <DefaultRoute handler = {SubmitReceipt} />
    <Route name="billPage" path="/:bill" handler={ReceiptList}/>
  </Route>
);

// Running Routes!
Router.run(routes, Router.HistoryLocation, function (Handler) {
  React.render(<Handler />, document.getElementById('content'));
});
      