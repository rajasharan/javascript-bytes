# Javascript-Bytes

Byte, Hex, Base64 manipulation in pure javascript

## Example Usage

```js
var ByteString = require('./src/ByteString.js');
var b = ByteString.decodeHex('48656c6c6f20776f726c64');

//raw data
console.log(b.data); // [ 72, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100 ]

//base64
console.log(b.base64()); // SGVsbG8gd29ybGQ=

//ascii
console.log(b.ascii()); // Hello world
```

## Run tests

```
grunt
```
OR
```
grunt watch
```

#### Initial inspiration from [square/okio](https://github.com/square/okio) library for java/android.
