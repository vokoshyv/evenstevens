/* 
* @Author: hal
* @Date:   2015-05-22 14:00:21
* @Last Modified by:   Johnny Nguyen
* @Last Modified time: 2015-05-28 17:33:12
*/

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

var Bill = require('./components/bill.react.js');
var Test = require('./components/test.react.js');

var routes = (
  <Route handler={EvenStevensApp} path="/">
    <Route path="/:bill" handler={Bill}/>
  </Route>
);

Router.run(routes, Router.HistoryLocation, function (Handler) {
  React.render(<Handler />, document.getElementById('content'));
});

//var socketClient = SocketClient('http://127.0.0.1:3000');

 





      