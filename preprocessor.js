/* 
* @Author: Johnny Nguyen
* @Date:   2015-05-29 16:27:03
* @Last Modified by:   Johnny Nguyen
* @Last Modified time: 2015-05-29 16:27:09
*/

// preprocessor.js
var ReactTools = require('react-tools');
module.exports = {
  process: function(src) {
    return ReactTools.transform(src);
  }
};