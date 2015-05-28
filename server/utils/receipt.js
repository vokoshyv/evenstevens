'use strict';

var fs = require('fs');
var tesseract = require('node-tesseract');
var Promise = require("bluebird");

Promise.promisifyAll(fs);

/**
 * Initial function to start parsing receipt data.
 * @param   {String}   path   Path to receipt image
 * @param   {JPEG}     file   Uploaded receipt image
 * @return  {Promise}         Returns parsed receipt items or error
 */
exports.parse = function(path, file) {
  return new Promise(function(resolve, reject) {
    readFile(file)
    .then(function(data) {
      return writeFile(path, data);
    })
    .then(function() {
      return process(path);
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
var process = function(path) {
  return new Promise(function(resolve, reject) {
    tesseract.process(path, function(err, text) {
      if (err) {
        reject(err);
      } else {
        var items = findItems(text);        

        resolve(items);  
      }
    });
  });
}

var findItems = function(text) {
  var receipt = text.split('\n');
  var costRegex = /^\$?\d+(,\d{3})*(\.\d*)?$/;
  var items = [];
  
  receipt.forEach(function(line, i) {
    var line = line.split(' ');
    var cost = line.pop();
    var quanity = parseIntline.shift();
    var description = line.join(' ');

    if (parseInt(quanity) && cost.search(costRegex) >= 0) {
      while (quanity--) {
        items.push({
          quanity: 1,
          description: description,
          cost: parseInt(cost)
        });
      }
    }
  });

  return items;
}





