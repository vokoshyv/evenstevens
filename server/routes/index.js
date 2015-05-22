/* 
* @Author: hal
* @Date:   2015-05-22 11:52:56
* @Last Modified by:   hal
* @Last Modified time: 2015-05-22 12:06:20
*/

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.html');
});

module.exports = router;