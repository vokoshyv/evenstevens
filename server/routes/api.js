/* 
* @Author: hal
* @Date:   2015-05-22 11:52:34
* @Last Modified by:   hal
* @Last Modified time: 2015-05-22 14:43:41
*/

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:name', function(req, res, next) {
  // res.send('respond with a resource');
  res.send(req.params.name);
});

router.post('/:name', function(req, res, next) {
  // res.send('respond with a resource');
  res.send('holler');
});

module.exports = router;