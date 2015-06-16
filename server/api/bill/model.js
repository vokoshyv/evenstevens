/* 
* @Author: Johnny Nguyen
* @Date:   2015-05-27 19:34:23
* @Last Modified by:   vokoshyv
* @Last Modified time: 2015-06-16 12:10:54
*/

'use strict';
/**
 * This is the model of how all of the receipts will be 
 * stored inside of the Redis datastore; it is also the 
 * format that will be sent back to the secondary users when
 * they initially connect to the room. 
 * @return {object} The party object itself
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