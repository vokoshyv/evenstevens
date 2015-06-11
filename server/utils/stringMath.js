'use strict';

/**
 * Takes in any number of string dollar amounts and returns the sum.
 * @return {String} Sum of the arguments
 */
exports.sum = function() {
  var args = Array.prototype.slice.call(arguments);
  var sum = 0;

  for (var i = 0; i < args.length; i++) {
    sum += stripDollar(args[i]);
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
  value = stripDollar(value);
  value = value / divisor;
  value = Math.floor(+(value + 'e' + 2));
  value = +(value + 'e' + (-2)); 
  
  return '$' + value.toFixed(2);
};

/**
 * Takes in subtotal and tax amount and returns percent tax percent
 * @param  {String} subtotal Total amount of ordered items 
 * @param  {String} tax      The tax total
 * @return {String}          Tax percent
 */
exports.getTaxPercent = function(subtotal, tax) {
  var args = Array.prototype.slice.call(arguments);

  for (var i = 0; i < args.length; i++) {
    args[i] = stripDollar(args[i]);
  }

  return ((args[1] / args[0]) * 100) + '%';
};

/**
 * Applies percentage to the value. If multiple percenages are passed,
 * the first percent is applied, then the second percent is applied to 
 * the new value and so on.
 * @param  {String} value Value amount
 * @return {String}       New value amount after applied percenages
 */
exports.applyPercent = function(value) {
  var percentages = Array.prototype.slice.call(arguments, 1);
  value = stripDollar(value);

  for (var i = 0; i < percentages.length; i++) {
    percentages[i] = stripPercent(percentages[i]);
    
    value = value * (1 + percentages[i]);
    value = Math.round(+(value + 'e' + 2));
    value = +(value + 'e' + (-2)); 
  }

  return '$' + value.toFixed(2);
};

/**
 * [percentOf description]
 * @param  {[type]} value   [description]
 * @param  {[type]} percent [description]
 * @return {[type]}         [description]
 */
exports.percentOf = function(value, percent) {
  value = stripDollar(value);
  percent = stripPercent(percent);

  var percentOf = value * percent;
  percentOf = Math.round(+(percentOf + 'e' + 2));
  percentOf = +(percentOf + 'e' + (-2)); 

  return '$' + percentOf.toFixed(2);
};

/**
 * Helper function to take string value and returns a float 
 * @param  {[type]} value [description]
 * @return {[type]}       [description]
 */
var stripDollar = function(value) {
  if (value[0] === '$') {
    value = value.substr(1);
  }

  return value = parseFloat(value);
};

var stripPercent = function(percent) {
  percent = percent.substr(0, percent.length - 1);
  percent = parseFloat(percent);
  return percent / 100;
};