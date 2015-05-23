/* 
* @Author: hal
* @Date:   2015-05-22 15:10:00
* @Last Modified by:   Johnny Nguyen
* @Last Modified time: 2015-05-22 17:26:46
*/

'use strict';

exports.show = function(req, res) {
  var billname = req.params.billname;
  return res.json(201, {billname: billname});
};

exports.create = function(req, res) {
  //redis code here;

};

exports.update = function(req, res) {
  //redis code here;

};