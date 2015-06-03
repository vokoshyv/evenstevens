/* 
* @Author: Johnny Nguyen
* @Date:   2015-06-02 16:37:13
* @Last Modified by:   Johnny Nguyen
* @Last Modified time: 2015-06-02 18:27:06
*/

'use strict';

/**
 * Bluebird does not get mocked properly by Jest.
 * This folder/file is necessary for testing.
 * More here: https://github.com/facebook/jest/issues/90.
 */
jest.autoMockOff();
module.exports = require.requireActual('bluebird');
jest.autoMockOn();