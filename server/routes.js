/* 
* @Author: Johnny Nguyen
* @Date:   2015-05-28 19:37:45
* @Last Modified by:   Johnny Nguyen
* @Last Modified time: 2015-05-29 12:15:26
*/

'use strict';

// var errors = require('./components/errors');
var bill = require('./api/bill/index');

module.exports = function(app) {
  app.use('/api/bills', bill);

  app.use('*', function (req, res) {
    res.sendfile('public/index.html', {root: __dirname});
  });

  // app.use('*/*', function (req, res) {
  //   res.sendfile('public/index.html', {root: __dirname});
  // });

  // All undefined asset or api routes should return a 404
  // app.route('/:url(api|auth|components|app|bower_components|assets)/*')
  // .get(errors[404]);

  // All other routes should redirect to the index.html
  // app.route('/*')
  // .get(function(req, res) {
  //   res.sendfile(app.get('appPath') + '/index.html');
  // });
}



