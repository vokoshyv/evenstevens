/* 
* @Author: vokoshyv
* @Date:   2015-05-23 16:42:04
* @Last Modified by:   vokoshyv
* @Last Modified time: 2015-05-23 17:06:21
*/

'use strict';


// set up redis database
var redis = require('redis');
var client = redis.createClient(6379, '127.0.0.1');

client.set('vege', 'radish', redis.print);
client.set('fruit', 'oranges', redis.print);

client.get('vege', function(error, value){

    if (error){
      throw error;
    }

    console.log('The vegetable is = ' + value);
})

client.get('fruit', function(error, value){

    if (error){
      throw error;
    }

    console.log('The fruit is = ' + value);
})

module.exports = client;