# Javascript-Bytes

Byte, Hex, Base64 manipulation in pure javascript

## Setup

```
$ npm install
$ bower install
$ grunt serve

Running "connect:server" (connect) task
Started connect web server on http://0.0.0.0:8000

Running "watch" task
Waiting...

```

## Usage

```js
/*
 * open browser console and type
 */
var b = ByteString.decodeHex('48656c6c6f20776f726c64');
console.log(b.data); // [ 72, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100 ]
console.log(b.base64()); // SGVsbG8gd29ybGQ=
console.log(b.ascii()); // Hello world
```
Look inside [`app.js`](src/app.js) to see what globals are available on window

#### Initial inspiration 
  * [square/okio](https://github.com/square/okio) library for java/android
  * [cryptopals.com](http://cryptopals.com/)
