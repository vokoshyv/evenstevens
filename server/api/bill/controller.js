/* 
* @Author: hal
* @Date:   2015-05-22 15:10:00
* @Last Modified by:   vokoshyv
* @Last Modified time: 2015-05-23 16:59:00
*/

'use strict';

var client = require('../../db.js')

exports.show = function(req, res) {
  var billname = req.params.billname;
  return res.json(201, {billname: billname});
};

exports.create = function(req, res) {
  //redis code here;
  //
  console.log("REACHED HEREEEREEEEEE");
  
  client.on('error', function(error){
    console.log('Error while creating the Socket Connection. Error is: ', error);
  });

  client.set('vege', 'radish', redis.print);
  client.set('fruit', 'APPLES', redis.print);

  // client.get('vege', function(error, value){

  //   if (error){
  //     throw error;
  //   }

  //   console.log('The vegetable is = ' + value);

  // })

};

exports.update = function(req, res) {
  //redis code here;

};