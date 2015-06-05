/* 
* @Author: hal
* @Date:   2015-05-22 15:10:00
* @Last Modified by:   Johnny Nguyen
* @Last Modified time: 2015-06-05 11:36:12
*/

'use strict';

var path = require('path');
var fs = require('fs');
var util = require('util');
var formidable = require('formidable');
var redis = require('redis');
var redisDB = require('../../db.js');
var bill = require('../../utils/bill');
var tesseract = require('node-tesseract');
var Promise = require("bluebird");

// seed for DB to test integration
var seed = require('../../config/seed').kingOfThai();

Promise.promisifyAll(fs);
Promise.promisifyAll(tesseract);

/**
 * [show description]
 * 
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.show = function(socket, data) {
  // send the full data object to the clients via sockets
  redisDB.hgetall(data.billName, function(error, object){
    if (error) throw error;
    if (object) socket.emit('fromServerInitialData', object);
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
  var randBillId = makeid();
  var billPath = path.join(__dirname, '../../.temp/', randBillId + '.jpg');
  var form = new formidable.IncomingForm();

  ////////////////////////////////////////////////
  // block below parses uploaded receipt image  //
  ////////////////////////////////////////////////
  form.parse(req, function(err, fields, files) {
    bill.parse(billPath, files.file.path, billName)
    .then(function(finalBill) {
      console.log('parsed text: ', require('util').inspect(finalBill, false, null));

      redisDB.keys("*", function(err, availKeys) {
        if (err) {
          throw err;
        }

        if (availKeys.indexOf(billName) > -1) {
          var counter = 0;
          var work = billName + counter.toString();

          while (availKeys.indexOf(work) > -1) {
            counter++;
            work = billName + counter.toString();
          }
          billName = work;
        }

        redisDB.hmset(billName, {
          "billName": finalBill.billName,
          "receipt": JSON.stringify(finalBill.receipt),
          "diners": JSON.stringify(finalBill.diners)
        }, redis.print);

        fs.unlink(path.join(__dirname, '../../.temp/' + randBillId + '.jpg'), function(err) {
          if (err) {
            throw err;
          }
        });

        res.status(201).json({billName: billName});
      });
    });
  });
};

/**
 * [update description]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */

exports.update = function(io, clientData) {

  var billName = clientData.billName;
  var dinersName = clientData.userName;
  var dinersArray = clientData.array;

  redisDB.hget(billName, 'diners', function(err, data){
    if (err) {
      throw err;
    } 
    else {

      var parsedData = JSON.parse(data);
      parsedData[dinersName] = dinersArray;
      var dataToBeInserted = JSON.stringify(parsedData);
      redisDB.hset(billName, 'diners', dataToBeInserted, redis.print);
      io.to(billName).emit('fromServerUpdate', clientData);

    }
  });
};

function handleError(res, err) {
  res.status(500).send(err);
  throw new Error('something bad happened');
}

function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}
