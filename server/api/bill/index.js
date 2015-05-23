/* 
* @Author: hal
* @Date:   2015-05-22 11:52:34
* @Last Modified by:   Johnny Nguyen
* @Last Modified time: 2015-05-22 16:09:36
*/

var express = require('express');
var controller = require('./controller');
var router = express.Router();

router.get('/:billname', controller.show);
router.post('/:billname', controller.create);
router.put('/:billname', controller.update);

module.exports = router;