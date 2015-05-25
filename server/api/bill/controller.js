/* 
* @Author: hal
* @Date:   2015-05-22 15:10:00
* @Last Modified by:   vokoshyv
* @Last Modified time: 2015-05-25 11:36:43
*/

'use strict';

var client = require('../../db.js')
var redis = require('redis');
// console.log('haha');

client.set('vege', 'carrots', redis.print);
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

exports.show = function(req, res) {
  // This wil likely be a socket interaction
  // From individualized URLs, send back the party object
  // 
  var billname = req.params.billname;
  return res.json(201, {billname: billname});
};

exports.create = function(req, res) {
  // 1) This is the initial function that takes the picture 
  // the client and tesseracts it. 
  // 2) Takes the tesseracted text and parses it into its 
  // component items
  // 3) Puts those items into the party object 
  // 4) Inserts party object into redis database: Key will 
  // be the billName, and value will be the party object
  // 5) Returns back to the client an individualized url 
  // for the party members to go back to. 
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
  // This will most assuredly be a socket interaction
  // 1) Update the party object inside the database based 
  // on new diners array with either new diners or items
  // having been selected
  // 2) Use socket to send update object out to all clients;
  // I think this will happen through a broadcasting socket

};