/* 
* @Author: Johnny Nguyen
* @Date:   2015-06-02 13:08:51
* @Last Modified by:   Johnny Nguyen
* @Last Modified time: 2015-06-02 18:29:06
*/

'use strict';

jest.dontMock('../bill.js');
jest.dontMock('../../../node_modules/underscore');
jest.dontMock('../../api/bill/model');

describe('Bill Parsing', function() {
  var bill = require('../bill.js');
  var _ = require('underscore');

  var util = require('util');
  
  var billModel = require('../../api/bill/model').billModel();
  billModel.billName = 'johnny';
  billModel.diners.push({diner: 'johnny', itemIndex: []});

  //TODO: 
  var rawBill = "King of Thasui Noodle House\n\
\n\
184 tZ>‘Fare|| Street\n\
San Fra“cisco, CA 941022\n\
(41£E‘.) 677--9991\n\
www.Kingof7'haiNood|eHoLI:ssee.ccom\n\
\n\
Talble I-J:\n\
_ rve: # :>rh Or‘de.3r#\n\
\n\
5:27/12015 -1:05-52 PM\n\
2 Roasted Duck over Rice 20.40\n\
\n\
1 Coke 1.80\n\
1 Crab Meat; Fried Rice ’~ 10.20\n\
1 Wonton Soup 8.50\n\
>Egg noodéezz\n\
\n\
1 Hot Tea 0.957\n\
:subTotaI 41.85»\n\
\n\
8.'i'5% fsales Tax 3.66\n\
\n\
Total :1»";

  var seed = { 
    billName: 'tsunami',
    receipt:
     { items:
        [ { description: 'Roasted Duck over Rice', cost: 10.2 },
          { description: 'Roasted Duck over Rice', cost: 10.2 },
          { description: 'Coke', cost: 1.8 },
          { description: 'Crab Meat; Fried Rice ’~', cost: 10.2 },
          { description: 'Wonton Soup', cost: 8.5 },
          { description: 'Hot Tea', cost: 0.957 } ],
      subTotal: 41.85,
      tax: 3.66,
      total: 45.51,
      tip: 0,
      grandTotal: 0 },
    diners: [ { diner: 'johnny', itemIndex: [] } ] 
  }

  it('expects post process to return valid data object', function() {
    var processedBill = bill.postProcess(billModel, rawBill);
    expect(_.isEqual(processedBill, seed)).toEqual(true);
  });
});