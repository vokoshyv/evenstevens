/* 
* @Author: hal
* @Date:   2015-05-22 11:52:34
* @Last Modified by:   Johnny Nguyen
* @Last Modified time: 2015-05-27 20:16:46
*/

var express = require('express');
var controller = require('./controller');
var router = express.Router();

router.get('/:billName', controller.show);
router.post('/:billName', controller.create);
router.put('/:billName', controller.update);

module.exports = router;