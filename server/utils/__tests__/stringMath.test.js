/* 
* @Author: Johnny Nguyen
* @Date:   2015-06-10 16:21:21
* @Last Modified by:   Johnny Nguyen
* @Last Modified time: 2015-06-10 16:55:15
*/

'use strict';

jest.dontMock('../stringMath.js');

describe('Bill Parsing', function() {

  var stringMath = require('../stringMath.js');

  it('expects string values to be summed', function() {
    var sum = stringMath.sum('$10.95', '$11', '$3.25');
    expect(sum).toEqual('$25.20');
  });

  it('expects string values to be divided with round floor', function() {
    expect(stringMath.divide("$10.00", 3)).toEqual('$3.33');
    expect(stringMath.divide("$11.00", 3)).toEqual('$3.66');
  });  

  it('expects percent from two values', function() {
    expect(stringMath.getTaxPercent('$100', '$10')).toEqual('10%');
  });

  it('expects percent from two values', function() {
    expect(stringMath.getTaxPercent('$100', '$10')).toEqual('10%');
  });

  it('expects multiple percentages to be applied to a value', function() {
    expect(stringMath.applyPercent('$10', '10%', '20%')).toEqual('$13.20');
    expect(stringMath.applyPercent('$10', '10%')).toEqual('$11.00');
  });

  it('expects percent of value', function() {
    expect(stringMath.percentOf('$10', '10%')).toEqual('$1.00');
    expect(stringMath.percentOf('$1.95', '9.5%')).toEqual('$0.19');
  });
});