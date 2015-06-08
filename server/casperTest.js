var port = process.env.PORT || 3000;
var host = 'http://localhost:' + port;
casper.test.begin('Testing Even Stevens', 1, function(test){
  casper.start(host);

  casper.then(function(){
      test.assertTitle('Even Stevens', 'Even Stevens has correct title');
  });

  casper.run(function(){
      test.done();
  });
});