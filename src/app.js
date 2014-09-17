var requirejs = require('requirejs');

requirejs.config({
    nodeRequire: require
});

requirejs(['ByteString'], function(ByteString) {
    var b = ByteString.ascii('Hello World');
    console.log(b.hex());
});
