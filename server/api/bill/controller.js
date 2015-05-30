/* 
* @Author: hal
* @Date:   2015-05-22 15:10:00
* @Last Modified by:   nathanbailey
* @Last Modified time: 2015-06-02 15:58:21
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
    });


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
          res.status(200).json({billName:billName});
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
  // stringify diners object, save it to database, then broadcast updateData to all users
  redisDB.hmset(data.billName, {
    "diners": JSON.stringify(data.updateData)
  }, function(){
    io.to(data.billName).emit('fromServerUpdate', data); // broadcast changes to everyone
  });
};
 
function handleError(res, err) {
  res.status(500).send(err);
  throw new Error('something bad happened');
}