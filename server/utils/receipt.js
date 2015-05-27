/* 
* @Author: Johnny Nguyen
* @Date:   2015-05-26 15:40:19
* @Last Modified by:   Johnny Nguyen
* @Last Modified time: 2015-05-26 16:38:26
*/

'use strict';

var fs = require('fs');

/** 
 * Checks for base64 format.
 * @param  {String}  receipt The receipt image URI
 * @return {Boolean}         Throws error or returns receipt
 */
exports.isBase64 = function(receipt) {
  var regexBase64 = /^data:([A-Za-z-+\/]+);base64,(.+)$/;
  var matches = receipt.match(regexBase64);

  if (matches.length !== 3) {
    return new Error('Invalid input string');
  }

  return receipt;
};

exports.toJPG = function(receipt, billname) {
  var bitmap = new Buffer(receipt, 'base64');

  fs.writeFile(billname + ".JPG", base64Data, 'base64', function(err) {
    console.log(err);
  });
};

exports.toPNG = function(receipt) {

};