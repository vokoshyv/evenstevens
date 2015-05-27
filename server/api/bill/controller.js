/* 
* @Author: hal
* @Date:   2015-05-22 15:10:00
*/

'use strict';

var client = require('../../db.js')
var redis = require('redis');

var receipt = require('../../utils/receipt');
// var tesseract = require('../../utils/tesseract');

var path = require('path');
var fs = require('fs');
var tesseract = require('node-tesseract');
var formidable = require('formidable'),
    util = require('util');


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
  var billname = req.params.billname;
  var form = new formidable.IncomingForm();

  form.parse(req, function(err, fields, files) {
    console.log(files.file.path);
    fs.readFile(files.file.path, function(err, data) {
      
      var newPath = path.join(__dirname + "../../../.temp");
      fs.writeFile(newPath + '/' + billname + '.jpg', data, function (err) {
        if (err) console.log(err);

        tesseract.process(newPath + '/' + billname + '.jpg', function(err, text) {
          if(err) {
            console.error(err);
          } else {
            console.log(text);
          }
        });
      });      



      // tesseract.process(data, function(err, text) {
      //   if(err) {
      //     console.error(err);
      //   } else {
      //     console.log(text);
      //   }
      // });
    })


    // res.writeHead(200, {'content-type': 'text/plain'});
    // res.write('received upload:\n\n');
    // console.log(files);

    // tesseract.process(__dirname + '/imgres.jpg', function(err, text) {
    //   if(err) {
    //     console.error(err);
    //   } else {
    //     console.log(text);
    //   }
    // });



    // res.end(util.inspect({fields: fields, files: files}));
  });



  // var base64 = receipt.isBase64(req.body.data);
  //receipt.toJPG(receipt.isBase64(req.body.data), billname);
  // var items = tesseract.parse('/path/to/image');
  // res.json(200, users);
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