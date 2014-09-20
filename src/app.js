//var requirejs = require('requirejs');

/*
 *requirejs.config({
 *    nodeRequire: require
 *});
 */

requirejs(['require', './ByteString'], function(require, ByteString) {
    var ByteString = require('./ByteString');
    var b = ByteString.ascii('Hello World');
    console.log(b.data);
    console.log(b.hex());
    console.log(b.base64());
    console.log(b.ascii());

    /*
     *for browser console testing
     */
    window.ByteString = ByteString;
});
