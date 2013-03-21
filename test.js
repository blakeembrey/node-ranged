/*global describe,it*/
var assert = require('assert'),
    range  = require('./');

describe('range', function () {
  it('should work with two range inputs', function () {
    assert.deepEqual(range(0, 5), [0, 1, 2, 3, 4, 5], 'generates sequenced arrays');
    assert.deepEqual(range(5, 0), [5, 4, 3, 2, 1, 0], 'can work in reverse');
    assert.deepEqual(range(-5, 0), [-5, -4, -3, -2, -1, 0], 'plays nice with negative numbers');
    assert.deepEqual(range('a', 'e'), ['a', 'b', 'c', 'd', 'e'], 'works with string character codes');
  });

  it('should parse range from a string', function () {
    assert.deepEqual(range('0..5'), [0, 1, 2, 3, 4, 5], 'generates sequenced arrays');
    assert.deepEqual(range('0..-4'), [0, -1, -2, -3, -4], 'works in reverse with negative numbers');
    assert.deepEqual(range('-5..-1'), [-5, -4, -3, -2, -1], 'works with negative numbers');
    assert.deepEqual(range('a..e'), ['a', 'b', 'c', 'd', 'e'], 'works with string character codes');
  });

  it('should allow exclusive boundary', function () {
    assert.deepEqual(range(0, 5, true), [0, 1, 2, 3, 4], 'excludes final number');
    assert.deepEqual(range(-5, 0, true), [-5, -4, -3, -2, -1], 'works on negative numbers');
    assert.deepEqual(range(0, -5, true), [0, -1, -2, -3, -4], 'works going in reverse');
    assert.deepEqual(range('a', 'e', true), ['a', 'b', 'c', 'd'], 'works with strings');
  });

  it('should allow exclusive boundary from a string', function () {
    assert.deepEqual(range('0...5'), [0, 1, 2, 3, 4], 'excludes the final number');
    assert.deepEqual(range('0...-4'), [0, -1, -2, -3], 'works while going in reverse');
    assert.deepEqual(range('-5...-1'), [-5, -4, -3, -2], 'works well with negative numbers');
    assert.deepEqual(range('a...e'), ['a', 'b', 'c', 'd'], 'works with alphabetical characters');
  });

  it('should allow specific step intervals', function () {
    assert.deepEqual(range(0, 10, 2), [0, 2, 4, 6, 8, 10], 'works with specific step interval');
    assert.deepEqual(range(10, 0, 2), [10, 8, 6, 4, 2, 0], 'step interval works in reverse');
    assert.deepEqual(range(-10, -4, 2), [-10, -8, -6, -4], 'works well with negative values');
    assert.deepEqual(range('a', 'e', 2), ['a', 'c', 'e'], 'works with string character codes');
  });

  it('should allow specific step intervals with strings', function () {
    assert.deepEqual(range('0..10', 2), [0, 2, 4, 6, 8, 10], 'works with specific step interval');
    assert.deepEqual(range('10..0', 2), [10, 8, 6, 4, 2, 0], 'step interval works in reverse');
    assert.deepEqual(range('-10..-4', 2), [-10, -8, -6, -4], 'works well with negative values');
    assert.deepEqual(range('a..e', 2), ['a', 'c', 'e'], 'works with string character codes');
  });

  it('should allow step intervals and exlusion', function () {
    assert.deepEqual(range(0, 10, 2, true), [0, 2, 4, 6, 8], 'works with specific step interval');
    assert.deepEqual(range(10, 0, 2, true), [10, 8, 6, 4, 2], 'step interval works in reverse');
    assert.deepEqual(range(-10, -4, 2, true), [-10, -8, -6], 'works well with negative values');
    assert.deepEqual(range('a', 'e', 2, true), ['a', 'c'], 'works with string character codes');
  });

  it('should allow step intervals and exlusion with strings', function () {
    assert.deepEqual(range('0...10', 2), [0, 2, 4, 6, 8], 'works with specific step interval');
    assert.deepEqual(range('10...0', 2), [10, 8, 6, 4, 2], 'step interval works in reverse');
    assert.deepEqual(range('-10...-4', 2), [-10, -8, -6], 'works well with negative values');
    assert.deepEqual(range('a...e', 2), ['a', 'c'], 'works with string character codes');
  });

  it('should support odd characters via the Ruby-esque syntax', function () {
    assert.deepEqual(range('...-'), ['.', '-'], 'works with beginning period');
    assert.deepEqual(range('-...'), ['-', '.'], 'works with trailing period');
  });

  it('should treat exclusive indexes appropriately', function () {
    assert.deepEqual(range(0, 10, 3), [0, 3, 6, 9], 'works with custom step');
    assert.deepEqual(range(0, 9, 3, true), [0, 3, 6], 'works with custom step');
    assert.deepEqual(range(0, 10, 4, true), [0, 4, 8], 'works with custom step');
    assert.deepEqual(range(0, 12, 3, true), [0, 3, 6, 9], 'works with custom step');
    assert.deepEqual(range(15, 20, 2), [15, 17, 19], 'works with custom step');
    assert.deepEqual(range(90, 99, 3), [90, 93, 96, 99], 'works with custom step');
    assert.deepEqual(range(5, 20, 5, true), [5, 10, 15], 'works with custom step');
    assert.deepEqual(range(0, -20, 5, true), [0, -5, -10, -15], 'works with custom step');
    assert.deepEqual(range(-20, -10, 3, true), [-20, -17, -14, -11], 'works with custom step');
  });

  it('should play nicely with decimal numbers', function () {
    // Patch the test with the floating point value - hopefully fix eventually
    assert.deepEqual(range(0, 0.4, 0.1), [0, 0.1, 0.2, 0.30000000000000004, 0.4], 'works with decimal steps');
    assert.deepEqual(range(0, 0.04, 0.01), [0, 0.01, 0.02, 0.03, 0.04], 'works with decimal steps');
    assert.deepEqual(range(0, 0.004, 0.001), [0, 0.001, 0.002, 0.003, 0.004], 'works with decimal steps');
  });
});