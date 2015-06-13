/* 
* @Author: hal
* @Date:   2015-05-22 11:52:34
* @Last Modified by:   hal
* @Last Modified time: 2015-06-12 19:29:10
*/

var express = require('express');
var controller = require('./controller');
var router = express.Router();

router.get('/:billName', controller.show);

module.exports = router;