var host = 'http://localhost:3000';
casper.test.begin('Testing EvenStevens.co', 2, function(test){
  casper.start(host);

  casper.then(function(){
    test.assertTitle('Even Stevens', 'Even Stevens has correct title');
    this.waitForResource("bundle.js", function() {
      test.pass("Found bundle.js");
    }, function() {
      test.fail("Did not find bundle.js");
    });
  });

  casper.then(function(){
    test.assertExists('#content', 'Found #content div element');
    test.assertExists('#content', 'Found #content.container div element');
    // test.assertExists('#content span', 'Found #helloWorld');

    if (this.exists('div:first-of-type')) {
      test.pass("Button found");
    } else {
      test.fail("Button not found");
    }

    // test.assertExists('form.form', 'Found form');
    // test.assertExists('button .btn-lrg.btn-primary', 'Found button div element');
    // test.assertExists('#helloWorld', '#helloWorld span element found');
    // casper.fill('selector', {
    //     'nameOfFormElement' : 'yourInput'
    // }, submit);

  });

  casper.run(function(){
      test.done();
  });
});