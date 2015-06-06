/* 
* @Author: hal
* @Date:   2015-05-22 14:23:06
* @Last Modified by:   Johnny Nguyen
* @Last Modified time: 2015-06-05 19:58:13
*/

'use strict';

exports.kingOfThai = function() {
  return {
    billName: "johnny",
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
      tip: .15,
      grandTotal: 51.79
    },
    diners: {
      'johnny': [true,  false, true,  false, false, true ],
      'mike':   [false, true,  false, false, false, false],
      'ron':    [false, false, false, false, true,  false],
      'nate':   [false, true,  false, true,  false, false]
    }
  }
}

exports.pakwan = function() {
  return {
    billName: 'johnny',
    receipt: {
      items: [{
        //andy
        item: 'BIHARI BOTI',
        cost: 8.99
      }, {
        //vince
        item: 'BIHARI BOTI',
        cost: 8.99
      }, {
        //vince
        item: 'ONION NAAN',
        cost: 2.99
      }, {
        //johnny
        item: 'CHICKEN TIKKA MASALA',
        cost: 8.99
      }, {
        //brant
        item: 'CHICKEN TIKKA MASALA',
        cost: 8.99
      }, {
        //johnny
        item: 'RICE',
        cost: 1.99
      }, {
        //brant
        item: 'RICE',
        cost: 1.99
      }, {
        //irfan
        item: 'CHICKEN ACHAR',
        cost: 7.99
      }, {
        //andy
        item: 'NAAN',
        cost: 1
      }, {
        //irfan
        item: 'NAAN',
        cost: 1
      }, {
        item: 'NAAN',
        cost: 1
      }],
      subTotal: 53.92,
      tax: 4.72,
      total: 58.64,
      tip: .18,
      grandTotal: 66.73
    },
    diners: {
      'johnny': [false, false, false, true,  false, true,  false, false, false, false, false],
      'irfan':  [false, false, false, false, false, false, false, true,  false, true,  false],
      'brant':  [false, false, false, false, true,  false, true,  false, false, false, false],
      'vince':  [false, true,  true,  false, false, false, false, false, false, false, false],
      'andy':   [true,  false, false, false, false, false, false, false, true,  false, false]
    }
  }
}