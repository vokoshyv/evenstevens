/* 
* @Author: Nathan Bailey
* @Date:   2015-05-27 13:47:49
* @Last Modified by:   Nathan Bailey
* @Last Modified time: 2015-05-27 13:48:11
*
* AppDispatcher
*
* A singleton that operates as the central hub for application updates.
*/

var Dispatcher = require('flux').Dispatcher;

module.exports = new Dispatcher();