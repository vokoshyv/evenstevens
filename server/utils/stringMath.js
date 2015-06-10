'use strict';

/**
 * Takes in any number of string dollar amounts and returns the sum.
 * @return {String} Sum of the arguments
 */
exports.sum = function() {
  var args = Array.prototype.slice.call(arguments);
  var sum = 0;

  for (var i = 0; i < args.length; i++) {
    if (args[i].substr(0, 1) === '$') {
      args[i] = args[i].substr(1)
    }

    sum += parseFloat(args[i]);
  }

  return '$' + sum.toFixed(2);
};

/**
 * Takes in a string dollar amount and returns the divided value.
 * @param  {String} value   Initial string value
 * @param  {String} divisor Divisor value
 * @return {String}         Result string
 */
exports.divide = function(value, divisor) {
  if (value[0] === '$') {
    value = parseFloat(value.substr(1));
  }

  return '$' + (value / divisor).toFixed(2);
};

/**
 * Takes in subtotal and tax amounds and returns percent tax percent
 * @param  {String} subtotal Total amount of ordered items 
 * @param  {String} tax      The tax total
 * @return {String}          Tax percent
 */
exports.getTaxPercent = function(subtotal, tax) {
  var args = Array.prototype.slice.call(arguments);

  for (var i = 0; i < args.length; i++) {
    if (args[i][0] === '$') {
      args[i] = args[i].substr(1);
    }

    args[i] = parseFloat(args[i]);
  }

  return ((args[1] / args[0]) * 100).toFixed(2) + '%';
};

/**
 * Takes in a value, applies tip and tax, and returns the new total.
 * @param  {String} value Cost of item(s)
 * @param  {String} tip   Tip percent
 * @param  {String} tax   Tax percent
 * @return {[type]}       New cost total
 */
exports.applyTipTax = function(value, tip, tax) {
  var args = Array.prototype.slice.call(arguments, 1);

  if (value[0] === '$') {
    value = value.substr(1);
  }

  value = parseFloat(value);

  for (var i = 0; i < args.length; i++) {
    args[i] = args[i].substr(0, args[i].length - 1);
    args[i] = parseFloat(args[i]);
    args[i] = args[i] / 100;
  }

  return '$' + (value + (value * args[0]) + (value * args[1])).toFixed(2);
};