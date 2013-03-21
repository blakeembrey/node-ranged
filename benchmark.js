var range     = require('./'),
    Benchmark = require('benchmark'),
    suite     = new Benchmark.Suite();

suite
  .add('Standard Range', function () {
    range(0, 99);
  })
  .add('Parsed Range  ', function () {
    range('0..99');
  })
  .add('Reversed Range', function () {
    range(99, 0);
  });

suite.run();

suite.forEach(function (test) {
  console.log(test.name + '   ' + test.hz); // What else to benchmark?
});