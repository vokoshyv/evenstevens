/* 
* @Author: hal
* @Date:   2015-05-22 14:23:06
* @Last Modified by:   hal
* @Last Modified time: 2015-06-02 21:01:16
*/

'use strict';

exports.bill = function() {
  return {
    billName: "tom",
    receipt: {
      items: [{
        item: 'Roasted Duck over Rice',
        cost: 10.20
      }, {
        item: 'Roasted Duck over Rice',
        cost: 10.20
      }, {
        item: 'Coke',
        cost: 1.80
      }, {
        item: 'Crab Meat Fried Rice',
        cost: 10.20
      }, {
        item: 'Wonton Soup',
        cost: 8.50
      }, {
        item: 'Hot Tea',
        cost: .95
      }],
      subTotal: 41.85,
      tax: 3.66,
      total: 45.51,
      tip: 6.28,
      grandTotal: 51.79
    },
    diners: [{
      diner: 'tom',
      itemIndex: [0,3]
    }]
  }
}