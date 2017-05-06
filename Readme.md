# Ranged

[![Greenkeeper badge](https://badges.greenkeeper.io/blakeembrey/node-ranged.svg)](https://greenkeeper.io/)

Return a range of numbers or characters based on input.

## Installation

```
npm install ranged --save
```

## API

The module exports a single function.

```javascript
var ranged = require('ranged');
```

**ranged(start, [stop], [step], [exclusive])**

* `start` - Takes a character, Ruby-style `0..10` range or number
* `stop` - Takes a character or number. Must be specified if you are not using the Ruby-style syntax
* `step` - Take a number which respesents the distance between each value in the array
* `exclusive` - Boolean to decide whether or not to include the final number

Passing a string to `ranged` causes the first character to be evaluated as the starting character code and will generate up until the end value.

```javascript
// Simplest use cases
ranged(0, 10) // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
ranged('0..10') // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
ranged('a', 'z') // ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

// Pass the step number into the function
ranged(0, 10, 2) // [0, 2, 4, 6, 8, 10]
ranged('0..10', 2) // [0, 2, 4, 6, 8, 10]
ranged('a', 'z', 2) // ['a', 'c', 'e', 'g', 'i', 'k', 'm', 'o', 'q', 's', 'u', 'w', 'y']

// Pass the exclusive flag alongside the values
ranged(0, 10, true) // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
ranged('0..10', true) // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
ranged('0...10') // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
ranged('a', 'z', true) // ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y']

// Pass both an exclusive flag and the step
ranged(0, 10, 2, true) // [0, 2, 4, 6, 8]
ranged('0..10', 2, true) // [0, 2, 4, 6, 8]
ranged('0...10', 2) // [0, 2, 4, 6, 8]
ranged('a', 'z', 2, true) // ['a', 'c', 'e', 'g', 'i', 'k', 'm', 'o', 'q', 's', 'u', 'w', 'y']

// Works with negative ranges
ranged(10, 0) // [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
ranged('10..0') // [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
ranged('z', 'a') // ['z', 'y', 'x', 'w', 'v', 'u', 't', 's', 'r', 'q', 'p', 'o', 'n', 'm', 'l', 'k', 'j', 'i', 'h', 'g', 'f', 'e', 'd', 'c', 'b', 'a']

// Pass characters with the Ruby syntax
range('a..z') // ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
range('z..a') // ['z', 'y', 'x', 'w', 'v', 'u', 't', 's', 'r', 'q', 'p', 'o', 'n', 'm', 'l', 'k', 'j', 'i', 'h', 'g', 'f', 'e', 'd', 'c', 'b', 'a']
```
