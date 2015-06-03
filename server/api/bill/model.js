/* 
* @Author: Johnny Nguyen
* @Date:   2015-05-27 19:34:23
* @Last Modified by:   Johnny Nguyen
* @Last Modified time: 2015-06-03 10:53:00
*/

'use strict';

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
  }
}