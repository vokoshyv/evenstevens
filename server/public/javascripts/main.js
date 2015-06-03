/* 
* @Author: hal
* @Date:   2015-05-22 14:00:21
<<<<<<< HEAD
* @Last Modified by:   nathanbailey
* @Last Modified time: 2015-06-02 16:07:28
=======
* @Last Modified by:   nathanbailey
* @Last Modified time: 2015-06-01 11:32:27
>>>>>>> Client now gets receipt data from socket event, renders to screen
*/
'use strict';

// This file is the main entry point for browserify

// var socket = io.connect('localhost:3000');
// var url = window.location.href.split('/');
// var billName = url[url.length-1];

// socket.on('fromServerInitialData', function (data) {
//   console.log('Server to Client', data);

//   // -----------------------------------------------
//   // Would normally occur in a tap event for item/list state changes
//   // test run of a data update from the client to server
//   var diners = [
//     {
//       "diner": "tom", 
//       "itemIndex": [0, 4]
//     },
//     {
//       "diner": "tim", 
//       "itemIndex": [1, 2]
//     },
//     {
//       "diner": "jim", 
//       "itemIndex": [3]
//     }
//   ];
//   socket.emit('userUpdate', {billName: billName, updateData: diners } );
//   // -----------------------------------------------

// });

// // once data is updated on the server, the update data gets broadcasted to all clients, handled here
// socket.on('fromServerUpdate', function (data) {
//   console.log('Server to Client', data);

// });

// socket.emit('userJoin', {billName: billName});
// socket.emit('userFirstRun', {billName: billName});

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
      