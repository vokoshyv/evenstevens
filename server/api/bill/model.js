/* 
* @Author: Johnny Nguyen
* @Date:   2015-05-27 19:34:23
* @Last Modified by:   vokoshyv
* @Last Modified time: 2015-06-15 11:18:01
*/

'use strict';
/**
 * [billModel description]
 * @return {[type]} [description]
 */
exports.billModel = function() {
  return {
    billName: '',
    receipt: {
      items: [],
      subTotal: 0,
      tax: 0,
      total: 0,
      tip: 0,
      grandTotal: 0
    },
    diners: {}
  };
};