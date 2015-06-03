/* 
* @Author: hal
* @Date:   2015-06-01 11:04:37
* @Last Modified by:   Johnny Nguyen
* @Last Modified time: 2015-06-03 11:59:38
*/

'use strict';

exports.cost = function() {
  // ^   : start of string
  // \$? : match optional dollar sign litteral
  // \d+ : match any digit any number of times
  // (   : start of group (whole dollar values)
  // \,  : match comma litteral
  // \d  : any digit
  // {3} : previous token (\d) exactly three times
  // )   : end of group
  // *   : repeat previous token ((\,\d{3})) as many times as needed
  // (   : start of group (cent values)
  // \.  : match decimal litteral 
  // \d* : repeat digit as many times as needed (allow repeating decimal incase additional digit artifacts are added during processing)
  // )   : end of group
  // ?   : repeat previous token zero or one times
  // .?  : optional character (allow random character incase additional character artifact is added during processing)
  // $   : end of string
  
  // regex for "$99 99" or "$99.99" values
  // return /^\$?\d+(\,\d{3})*((?!.*  )[\.? ]\d*)?.?$/
  
  return /^\$?\d+(\,\d{3})*(\.\d*)?.?$/
};

/**
 * Name regex used to valid user name input
 * @return  {Regex}  Allow alphanumberic, underscore, and dash
 */
exports.billName = function() {
  // ^   : start of string
  // [   : beginning of character group
  // a-z : any lowercase letter
  // A-Z : any uppercase letter
  // 0-9 : any digit
  // ]   : end of character group
  // *   : zero or more of the given characters
  // $   : end of string
  return /^[a-zA-Z0-9]*$/
};