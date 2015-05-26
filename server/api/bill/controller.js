/* 
* @Author: hal
* @Date:   2015-05-22 15:10:00
<<<<<<< HEAD
=======
* @Last Modified by:   Nathan Bailey
* @Last Modified time: 2015-05-26 15:53:10
>>>>>>> Sends base 64 image to server
*/

'use strict';

var client = require('../../db.js')
var redis = require('redis');


exports.show = function(req, res) {
  // This wil likely be a socket interaction
  // From individualized URLs, send back the party object
  
  // var billname = req.params.billname;
  // return res.json(201, {billname: billname});
  
  // Pretending that is is a HTTP request, I would pull off
  // the URL from the req.params and use it to search the 
  // redis database for a corresponding key
  client.hgetall('tomparty', function(error, object){
    if (error){
      throw error;
    }
    if (object){
      console.log("Here's the billName property: " + object.billName);
      console.log("Here's the receipt property: " + object.receipt);
      console.log("Here's the diners property: " + object.diners);
    }
    // want to parse the object and send it out to clients
    // (via socket or http response)
  });


};

exports.show = function(req, res) {
  // This wil likely be a socket interaction
  // From individualized URLs, send back the party object
  // 
  // 
  var billname = req.params.billname;
  return res.json(201, {billname: billname});
};

exports.create = function(req, res) {
  // 1) This is the initial function that takes the picture 
  // the client and tesseracts it. 
    // GO JOHNNY GO - we'll help
  
  // 2) Takes the tesseracted text and parses it into its 
  // component items
    // GO JOHNNY GO - we'll help
  
  // 3) Puts those items into the party object 
  

  console.log(req.body);
  res.sendStatus(200);
  
  var tomparty = {
    "billName": "tomparty",
    "receipt": {
      "items": [
      {
        "item": "Hamburger",
        "cost": 9.73
      }, 
      {
        "item": "Hot Dog",
        "cost": 7.42
      }, 
      {
        "item": "Cheeseburger",
        "cost": 10.52
      }],
      "subTotal": 27.67,
      "tax": 2.63,
      "total": 30.30,
      "tip": 4.50,
      "grandTotal": 34.80
    },
    "diners": [{
      "diner": "tom",
      "itemIndex": []
    }]
  }
  
  // 4) Inserts party object into redis database: Key will 
  // be the billName, and value will be the party object
  client.hmset('tomparty', {
    "billName": tomparty.billName,
    "receipt": JSON.stringify(tomparty.receipt),
    "diners": JSON.stringify(tomparty.diners)
  }, redis.print);
  
  // 5) Returns back to the client an individualized url 
  // for the party members to go back to. 

};

exports.update = function(req, res) {
  // This will most assuredly be a socket interaction
  // 1) Update the party object inside the database based 
  // on new diners array with either new diners or items
  // having been selected
  // 2) Use socket to send update object out to all clients;
  // I think this will happen through a broadcasting socket
  // 3) Whether to send out the entire party object or just
  // the update object: will have to make a decision
  
  // {
  //   "billName": String, 
  //   "diners" [{
  //     "diner" String,
  //     "itemIndex": [Number]
  //   }]
  // }
  
  var newDiners = [{
    "diner": "tom", 
    "itemIndex": [0, 2, 3]
  }]

  client.hmset('tomparty', {
    "diners": JSON.stringify(newDiners)
  })

};