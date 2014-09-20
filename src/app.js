//var requirejs = require('requirejs');

/*
 *requirejs.config({
 *    nodeRequire: require
 *});
 */

requirejs(['require', './ByteString', './byte'], function(require, ByteString, byte) {
    var ByteString = require('./ByteString');
    var b = ByteString.ascii('Hello World');
    var utils = require('./byte');

    console.log(b.data);
    console.log(b.hex());
    console.log(b.base64());
    console.log(b.ascii());

    /*
     *for browser console testing
     */
    window.ByteString = ByteString;
    window.utils = utils;
});
