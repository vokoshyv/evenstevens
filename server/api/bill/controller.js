/* 
* @Author: hal
* @Date:   2015-05-22 15:10:00
* @Last Modified by:   vokoshyv
* @Last Modified time: 2015-06-16 13:10:58
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

Promise.promisifyAll(fs);
Promise.promisifyAll(tesseract);

/**
 * When the secondary users first connect to the Even
 * Stevens site, this show controller function is run to 
 * extract the designated party object out of the Redis
 * datastore. 
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
 */
exports.create = function(req, res) {
  var billName = req.params.billName.toLowerCase();
  var randBillId = makeid();
  var billPath = path.join(__dirname, '../../.temp/', randBillId + '.jpg');
  var form = new formidable.IncomingForm();

  ////////////////////////////////////////////////
  // block below parses uploaded receipt image  //
  ////////////////////////////////////////////////
  form.parse(req, function(err, fields, files) {
    bill.parse(billPath, files.file.path, fields)
    .then(function(finalBill) {
      console.log('/**');
      console.log(' * /////////////////');
      console.log(' * // parsed text //');
      console.log(' * /////////////////');
      console.log(' */')
      console.log(require('util').inspect(finalBill, false, null));
      console.log('\n');

      fs.unlink(path.join(__dirname, '../../.temp/' + randBillId + '.jpg'), function(err) {
        if (err) {
          throw err;
        }
      });

      if (!Object.keys(finalBill).length) {
        return res.status(202).json({});
      }


      redisDB.keys("*", function(err, availKeys) {
        if (err) {
          throw err;
        }

        /**
         * This if block checks if the user-supplied 
         * billname already exists in the database. If it 
         * does, a number is appended to the billname in 
         * order to make it unique. 
         */
        if (availKeys.indexOf(billName) > -1) {
          var counter = 0;
          var work = billName + counter.toString();

          while (availKeys.indexOf(work) > -1) {
            counter++;
            work = billName + counter.toString();
          }
          billName = work;
        }

        /**
         * This code block inserts the party object into the
         * redis database under the billname key
         */
        redisDB.hmset(billName, {
          "billName": finalBill.billName,
          "receipt": JSON.stringify(finalBill.receipt),
          "diners": JSON.stringify(finalBill.diners)
        }, redis.print);

        /**
         * This res.status being sent back provides the 
         * billname to redirect the user to in order to 
         * access his own bill. Other users will also go to 
         * the same url in order to interact with the
         */
        return res.status(201).json({billName: billName});
      });
    })
    .catch(function(err) {
      handleError(res, err);
    });
  });
};

/**
 * This update controller function is run whenever the any 
 * of the users make any interaction with the application. 
 * The socket is the socket that has been created between
 * the server and client. The clientData is the data that's 
 * been passed in. 
 */
exports.update = function(socket, clientData) {

  var billName = clientData.billName;
  var dinersName = clientData.userName;
  var dinersArray = clientData.array;

  /**
   * This code block will update the party object inside the
   * redis database
   */
  redisDB.hget(billName, 'diners', function(err, data){
    if (err) {
      throw err;
    } 
    else {


      var parsedData = JSON.parse(data);
      parsedData[dinersName] = dinersArray;
      var dataToBeInserted = JSON.stringify(parsedData);
      redisDB.hset(billName, 'diners', dataToBeInserted, redis.print);

      /**
       * This socket emission is sent out to all the users; 
       * it tells them to update the current state of their
       * own party objects. In this way, everybody will 
       * have the most up-to-date state of the party object
       */
      socket.to(billName).broadcast.emit('fromServerUpdate', clientData);

    }
  });
};

/**
 * Error handling for all bill REST actions
 * @param  {Object} res Node response object
 * @param  {Object} err Error
 */
function handleError(res, err) {
  res.status(500).send(err);
}

/**
 * Makes a random file name generator for saved uploaded images. 
 * This is necessary to (reasonably) avoid file collisions.
 * @return {String} Random alphanumeric, five character string
 */
function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}
