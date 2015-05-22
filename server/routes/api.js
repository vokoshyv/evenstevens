/* 
* @Author: hal
* @Date:   2015-05-22 11:52:34
* @Last Modified by:   Johnny Nguyen
* @Last Modified time: 2015-05-22 14:20:23
*/

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  res.send('holler');
});

router.post('/', function(req, res, next) {
  // res.send('respond with a resource');
  res.send('holler');
});

module.exports = router;