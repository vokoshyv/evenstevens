/* 
* @Author: hal
* @Date:   2015-05-22 14:00:21
* @Last Modified by:   Nathan Bailey
* @Last Modified time: 2015-05-27 13:49:47
*/

// uncomment when browserify is configured
// var React = require('react');
// 
// var eStevensApp = require('./components/eStevensApp.react')
// 
// 



var React = require('react');

var EvenStevensApp = require('./components/eStevensApp.react.js')

React.render(
  <EvenStevensApp />,
  document.getElementById('content')
);

//var socketClient = SocketClient('http://127.0.0.1:3000');

 





      