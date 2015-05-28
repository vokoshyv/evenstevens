/* 
* @Author: hal
* @Date:   2015-05-22 15:10:00
* @Last Modified by:   Johnny Nguyen
* @Last Modified time: 2015-05-28 14:46:16
*/

'use strict';

var path = require('path');
var fs = require('fs');
var util = require('util');
var formidable = require('formidable');
var redis = require('redis');
var client = require('../../db.js')
var receipt = require('../../utils/receipt');
var tesseract = require('node-tesseract');
var Promise = require("bluebird");

// seed for DB to test integration
var seed = require('../../../config/seed').bill();

Promise.promisifyAll(fs);
Promise.promisifyAll(tesseract);

/**
 * [show description]
 * 
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
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

/**
 * Initial post for receipt image. 
 * 1. Validate image URI
 * 2. Save to ~/server/.temp
 * 3. Parse items from receipt
 * 4. Save to Redis
 * 5. Return saved object/emmit socket event
 *
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.create = function(req, res) {
  var billName = req.params.billName;
  var form = new formidable.IncomingForm();
  var receiptPath = path.join(__dirname, '../../.temp/', billName + '.jpg');

  // save seed to DB and return JSON on success
  // [redis code here]
  console.log(seed);

  ////////////////////////////////////////////////
  // block below parses uploaded receipt image  //
  ////////////////////////////////////////////////
  // form.parse(req, function(err, fields, files) {
  //   receipt.parse(receiptPath, files.file.path, billName)
  //   .then(function(text) {
  //     console.log('from controller: ', text);
         // save seed to DB and return JSON on success
         // [redis code here]
  //   })
  // });
};

/**
 * [update description]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
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

function handleError(res, err) {
  res.status(500).send(err);
  throw new Error('something bad happened');
}