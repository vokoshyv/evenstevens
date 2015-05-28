'use strict';

var fs = require('fs');
var tesseract = require('node-tesseract');
var Promise = require("bluebird");
var bill = require('../api/bill/model').billModel();

Promise.promisifyAll(fs);

/**
 * Initial function to start parsing receipt data.
 * @param   {String}   path   Path to receipt image
 * @param   {JPEG}     file   Uploaded receipt image
 * @return  {Promise}         Returns parsed receipt items or error
 */
exports.parse = function(path, file, billName) {
  return new Promise(function(resolve, reject) {
    readFile(file)
    .then(function(data) {
      return writeFile(path, data);
    })
    .then(function() {
      return process(path, billName);
    })
    .then(function(text) {
      resolve(text);
    })
    .catch(function(err) {
      reject(err);
    })
    .done();
  });
};

/**
 * Reads receipt image file from Formidable
 * @param   {JPEG}     file   Uploaded receipt image
 * @return  {Promise}         Returns parsed receipt items or error
 */
var readFile = function(file) {
  return fs.readFileAsync(file)
  .then(function(data) {
    return data;
  })
  .catch(function(err) {
    return err;
  });
}

/**
 * Writes to receipt image to disk.
 * @param   {String}   path   Path to receipt image
 * @param   {JPEG}     file   Uploaded receipt image
 * @return  {Promise}         Returns parsed receipt items or error
 */
var writeFile = function(path, file) {
  return fs.writeFileAsync(path, file)
  .then(function() {
    return;
  })
  .catch(function(err) {
    return err;
  });
}

/**
 * Process receipt items to JSON object
 * @param   {JPEG}     file   Uploaded receipt image
 * @return  {Promise}         Returns parsed receipt items or error
 */
var process = function(path, billName) {
  return new Promise(function(resolve, reject) {
    tesseract.process(path, function(err, text) {
      if (err) {
        reject(err);
      } else {
        console.log(text);
        resolve(findItems(text, billName));
      }
    });
  });
}

var findItems = function(text, billName) {
  var receipt = text.split('\n');
  var costRegex = /^\$?\d+(,\d{3})*(\.\d*)?$/;

  bill.billName = billName;
  bill.diners.push({diner: billName, itemIndex: []});
  
  for (var i = 0; i < receipt.length; i++) {
    var line = receipt[i].split(' ');
    var cost = line.pop();
    console.log('cost: ', cost)
    //continue if line doesn't have a cost
    if (cost.search(costRegex) < 0) {
      continue;
    }

    //if first position is a number, assume line item
    if (!isNaN(line[0])) {
      var quanity = parseInt(line.shift());

      while(quanity--) {
        bill.receipt.items.push({
          quanity: 1,
          description: line.join(' '),
          cost: cost
        });
      }
    }

    if (line.indexOf("SubTotal")) {
      bill.receipt.subTotal = cost;
    }

    if (line.indexOf("Tax")) {
      bill.receipt.tax = cost;
    }

    if (line.indexOf("Total")) {
      bill.receipt.total = cost;
    }

    return bill;
  }  
}

