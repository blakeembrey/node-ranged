var parseRangeString = function (string) {
  var parse = {
    start: 0,
    stop:  0,
    exclusive: false
  }, indexOf;

  // If the input is not a string or doesn't match the Ruby syntax
  if (typeof string !== 'string' || !~(indexOf = string.indexOf('..'))) {
    return new Error('Expected Ruby-style string input');
  }

  if (string[0] === '.') {
    indexOf += 1; // Increment the index of by one
  }

  parse.start = string.slice(0, indexOf);
  parse.stop  = string.slice(indexOf + 2);
  if (parse.stop.charAt(0) === '.' && parse.stop.length > 1) {
    parse.stop      = parse.stop.slice(1);
    parse.exclusive = true;
  }

  // Try to keep the types as numbers where appropriate
  parse.start = isNaN(+parse.start) ? parse.start : +parse.start;
  parse.stop  = isNaN(+parse.stop)  ? parse.stop  : +parse.stop;

  return parse;
};

module.exports = function (/* start, stop, step, exclusive */) {
  var start     = 0,
      stop      = 0,
      step      = 0,
      exclusive = false,
      charCodes = false,
      array     = [],
      parse;

  switch (arguments.length) {
    case 1:
      parse = parseRangeString(arguments[0]);

      if (parse instanceof Error) { throw parse; } // Bad syntax parsing

      start     = parse.start;
      stop      = parse.stop;
      exclusive = parse.exclusive;
      break;
    case 2:
      if (typeof arguments[0] === 'string' && ~arguments[0].indexOf('..')) {
        parse     = parseRangeString(arguments[0]);
        start     = parse.start;
        stop      = parse.stop;
        exclusive = parse.exclusive;
        step      = arguments[1] || step; // Second argument should be the step
      } else {
        start = arguments[0];
        stop  = arguments[1];
      }
      break;
    case 3:
        start = arguments[0];
        stop  = arguments[1];
        if (typeof arguments[2] === 'number') {
          step      = arguments[2];
        } else {
          exclusive = !!arguments[2];
        }
      break;
    case 4:
        start     = arguments[0];
        stop      = arguments[1];
        step      = arguments[2];
        exclusive = !!arguments[3];
      break;
  }

  // Kick into character code mode if either types are strings
  if (typeof start === 'string' || typeof stop === 'string') {
    charCodes = true;
    start     = ('' + start).charCodeAt(0);
    stop      = ('' + stop).charCodeAt(0);
    step      = step || 1;
  } else if (!step) {
    // Both are likely numbers, but no step was provided. Use the greatest
    // number of decimal places to calculate a step interval appropriately
    step = Math.pow(10, Math.floor(Math.log(Math.abs(stop - start > 9 ? (stop - start) / 10 : stop - start)) / Math.log(10)));
  }

  step = Math.abs(step) * (start > stop ? -1 : 1) || 1; // Evals to `0` - use `1`

  for (var i = start; step < 0 ? i >= stop : i <= stop; i += step) {
    array.push(charCodes ? String.fromCharCode(i) : i);
  }

  // If it's exclusive, use the step to exclude the final element from the array
  if (exclusive && (stop - start) % step === 0) {
    array.pop();
  }

  return array;
};