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

  value = value / divisor;
  value = Math.floor(+(value + 'e' + 2));
  value = +(value + 'e' + (-2)); 
  
  return '$' + value.toFixed(2);
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
 * Applies percentage to the value. If multiple percenages are passed,
 * the first percent is applied, then the second percent is applied to 
 * the new value and so on.
 * @param  {String} value Value amount
 * @return {String}       New value amount after applied percenages
 */
exports.applyPercent = function(value) {
  var percentages = Array.prototype.slice.call(arguments, 1);

  if (value[0] === '$') {
    value = value.substr(1);
    console.log(typeof value)
    value = parseFloat(value);
  }

  console.log(typeof value)

  for (var i = 0; i < percentages.length; i++) {
    percentages[i] = percentages[i].substr(0, percentages[i].length - 1);
    percentages[i] = parseFloat(percentages[i]);
    percentages[i] = percentages[i] / 100;
    
    value = value * (1 + percentages[i]);
    value = Math.round(+(value + 'e' + 2));
    value = +(value + 'e' + (-2)); 
  }

  return '$' + value.toFixed(2);
};