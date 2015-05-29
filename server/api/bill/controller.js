/* 
* @Author: hal
* @Date:   2015-05-22 15:10:00
* @Last Modified by:   vokoshyv
* @Last Modified time: 2015-05-29 19:56:53
*/

'use strict';

var path = require('path');
var fs = require('fs');
var util = require('util');
var formidable = require('formidable');
var redis = require('redis');
var client = require('../../db.js')
var bill = require('../../utils/bill');
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
// exports.show = function(req, res, next) {
// exports.show = function(req, res, socketServer) {
exports.show = function(billName) {
  console.log('controller.js show() redirect to query string STEP 3.1');

  // var ss = socketServer();
  // console.log('controller.js show() set socketServer.room STEP 3.1', ss.room);



  // This wil likely be a socket interaction
  // From individualized URLs, send back the party object
  // 
  // 
  // var billname = req.params.billname;
  // return res.json(201, {billname: billname});
  // return res.sendFile(path.join(__dirname, 'public'));

  // var billname = req.url.split('/')[1];
  // return res.redirect(301, 'http://localhost:3000/?billname='+billname);

  // This wil likely be a socket interaction
  // From individualized URLs, send back the party object
  
  var billName = req.params.billName;
  // return res.json(201, {billname: billname});
  
  // Pretending that is is a HTTP request, I would pull off
  // the URL from the req.params and use it to search the 
  // redis database for a corresponding key

  redisDB.hgetall('tomparty', function(error, object){
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
  // next();
};

/**
 * Initial post for bill image. 
 * 1. Validate image URI
 * 2. Save to ~/server/.temp
 * 3. Parse items from bill
 * 4. Save to Redis
 * 5. Return saved object/emmit socket event
 *
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.create = function(req, res) {
  var billName = req.params.billName;
  var billPath = path.join(__dirname, '../../.temp/', billName + '.jpg');
  var form = new formidable.IncomingForm();

  // save seed to DB and return JSON on success
  // [redis code here]
  // console.log(seed);

  // res.status(200).json(seed); 

  ////////////////////////////////////////////////
  // block below parses uploaded receipt image  //
  ////////////////////////////////////////////////
  form.parse(req, function(err, fields, files) {
    bill.parse(billPath, files.file.path, billName)
    .then(function(text) {
      console.log('parsed text: ', require('util').inspect(text, false, null));
      // console.log('from controller: ', text);
      //    save seed to DB and return JSON on success
      //    [redis code here]
    })
  });
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

  redisDB.hmset('tomparty', {
    "diners": JSON.stringify(newDiners)
  });
 
};
 
function handleError(res, err) {
  res.status(500).send(err);
  throw new Error('something bad happened');
}