//var requirejs = require('requirejs');

requirejs.config({
    paths: {
        jquery: '/bower_components/jquery/dist/jquery.min'
    }
});

requirejs(['require', './ByteString', './byte', 'jquery'], function(require, ByteString, byte) {
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
