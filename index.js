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
    indexOf += 1; // Increment the index by one
  }

  parse.start = string.slice(0, indexOf);
  parse.stop  = string.slice(indexOf + 2);
  if (parse.stop[0] === '.' && parse.stop.length > 1) {
    parse.stop      = parse.stop.slice(1);
    parse.exclusive = true;
  }

  // Try to keep the types as numbers where appropriate
  parse.start = isNaN(+parse.start) ? parse.start : +parse.start;
  parse.stop  = isNaN(+parse.stop)  ? parse.stop  : +parse.stop;

  return parse;
};

/**
 * Simple function with a dynamic arguments length to generate an array
 *
 * @param  {Number|String} start     A single character, number or Ruby-esque string
 * @param  {Number|String} stop      A single character or number, not required with Ruby string
 * @param  {Number}        step      The distance between each value in the generated array
 * @param  {Boolean}       exclusive Excludes the final number from the output array
 *
 * @return {Array} Generated array range
 */
module.exports = function (start, stop, step, exclusive) {
  var charCodes = false,
      array     = [],
      reversed  = false,
      parsed;

  if (arguments.length === 1 || typeof arguments[0] === 'string' && ~arguments[0].indexOf('..')) {
    parsed = parseRangeString(arguments[0]);

    if (parsed instanceof Error) { throw parsed; } // Bad syntax parsing - break

    step      = arguments[1];
    exclusive = arguments[2];
    // Set the parsed data after to avoid mutating the arguments object
    start     = parsed.start;
    stop      = parsed.stop;
    exclusive = parsed.exclusive;
  }

  // If the step turns out not to be a number, switch these
  if (typeof step !== 'number') {
    exclusive = exclusive || step;
    step      = null; // Unset the step
  }

  // Kick into character code mode if either types are strings
  if (typeof start === 'string' || typeof stop === 'string') {
    charCodes = true;
    start     = ('' + start).charCodeAt(0);
    stop      = ('' + stop).charCodeAt(0);
  }

  if (start > stop) {
    var temp = start;
    start    = stop;
    stop     = temp;
    reversed = true;
  }

  step = Math.abs(step) || 1; // Evals to `0` or `NaN` - will use `1`

  for (var i = start; i <= stop; i += step) {
    array.push(charCodes ? String.fromCharCode(i) : i);
  }

  // If the array should be reversed, quickly reverse the array
  if (reversed) { array.reverse(); }

  // If it's exclusive, use the step to exclude the final element from the array
  if (exclusive && (stop - start) % step === 0) {
    array.pop();
  }

  return array;
};