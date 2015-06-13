/* 
* @Author: hal
* @Date:   2015-05-22 11:52:34
* @Last Modified by:   hal
* @Last Modified time: 2015-06-13 15:11:43
*/

var express = require('express');
var controller = require('./controller');
var router = express.Router();

router.post('/:billName', controller.create);

module.exports = router;