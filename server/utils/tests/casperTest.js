var host = 'http://localhost:3000';
var path = 'server/utils/tests/';
var numberOfTests = 8;

casper.test.begin('Testing EvenStevens.co', numberOfTests, function(test){
  casper.start(host);

// --------------------------------------------------------------------
  // site loading tests
  casper.then(function(){
    test.assertTitle('Even Stevens', 'Even Stevens has correct title');
    this.echo('');
    // this.echo(this.getHTML());

    var waitForResource = function (context, fileName) {
      context.waitForResource(fileName, function(){
        test.pass("Found " + fileName);
      }, function () {
        test.fail("Did not find " + fileName);
      });
    };

    var fileName = 'main.css';
    waitForResource(this, fileName);

    fileName = 'bootstrap.min.css';
    waitForResource(this, fileName);

    fileName = 'bundle.js';
    waitForResource(this, fileName);

    fileName = 'socket.io.min.js';
    waitForResource(this, fileName);
  });

// --------------------------------------------------------------------
  // element exists tests

  casper.then(function(){
    this.echo('');
    casper.page.injectJs(path + 'jquery.js');

    var getElement = function (selector) {
      var temp = casper.evaluate(function(selector) {
        return $(selector);
      }, selector);
      return temp;
    };

    var isElement = function (selector) {
      var element = getElement(selector);
      if (element[0] !== undefined) element = element[0];
      if (element.innerHTML === undefined) {
        test.fail("Didn't find element with selector " + selector);
      } else {
        test.pass("Found element with selector " + selector);
      }
    };

    var showElement = function (selector) {
      var element = getElement(selector);
      if (element[0] !== undefined) element = element[0];
      if (element.innerHTML === undefined) return null;
      console.log('ID:', element.id, 'CLASSNAME:', element.className, '', element.innerHTML);
    };

    var selector = 'body';
    isElement(selector);

    var selector = '#content';
    isElement(selector);

    // -------------------------------------------------------------------------------------------------
    // test fails, a getHTML shows that the react elements aren't being loaded by the start of the test.
    // was tried inside of a waitForResource on bundle.js , but not successful
    // TODO: try looking into casper.thenOpen together with casper.wait , 

    // var selector = '.container'; // test fails
    // isElement(selector);

    // this.echo(this.getHTML());
    // -------------------------------------------------------------------------------------------------

  });

  casper.run(function(){
      test.done();
  });
});