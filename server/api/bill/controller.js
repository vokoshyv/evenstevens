/* 
* @Author: hal
* @Date:   2015-05-22 15:10:00
* @Last Modified by:   user
* @Last Modified time: 2015-06-01 19:49:31
*/

'use strict';

var path = require('path');
var fs = require('fs');
var util = require('util');
var formidable = require('formidable');
var redis = require('redis');
var redisDB = require('../../db.js')
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
exports.show = function(io, data) {
  // send the full data object to the clients via sockets
  redisDB.hgetall(data.billName, function(error, object){
    if (error) throw error;
    if (object) io.to(data.billName).emit('fromServerInitialData', object);
  });
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
  
  redisDB.keys("*", function(err, availKeys){
    if (err){
      throw error;
    }

    if (availKeys.indexOf(billName) > -1){
      var counter = 0;
      var work = billName + counter.toString();

      while (availKeys.indexOf(work) > -1){
        counter++;
        work = billName + counter.toString();
      }
      billName = work;
    }

    redisDB.hmset(billName, {
      "billName": seed.billName,
      "receipt": JSON.stringify(seed.receipt),
      "diners": JSON.stringify(seed.diners)
    }, redis.print);

    res.status(200).json({billName: billName});
  })





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

exports.update = function(io, data) {
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