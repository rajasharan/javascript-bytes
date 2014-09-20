if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['./Base64'], function(Base64) {
    var Base64 = require('./Base64');
    function ByteString(data) {
        this.data = data.map(function(val) {
            return val;
        });
    }

    ByteString.prototype.ascii = function() {
        return this.data.map(function(val) {
            return String.fromCharCode(val);
        }).reduce(function(prev, curr) {
            return prev + curr;
        });
    };

    ByteString.prototype.hex = function() {
        if (!this.hexdata) {
            this.hexdata = this.data.map(function(val) {
                var hex = val.toString(16);
                if (hex.length === 1) hex = '0' + hex;
                return hex;
            }).reduce(function(prev, curr) {
                return prev + curr;
            });
        }
        return this.hexdata;
    };

    ByteString.prototype.base64 = function() {
        return Base64.encode(this.data);
    };

    ByteString.decodeHex = function(str) {
        if(str.length % 2 !== 0 || str.length === 0 || typeof(str) !== "string") {
            throw new Error("Invalid HEX string: " + str);
        }
        var start = 0;
        var end = 2;
        var s;
        var res = [];
        var num;
        do {
            s = str.slice(start, end);
            num = parseInt(s, 16);
            if(isNaN(num)) {
                throw new Error("Invalid HEX char: " + s);
            }
            res.push(num);
            start = end;
            end = end+2;
        }
        while(end <= str.length);

        return new ByteString(res);
    };

    ByteString.decodeBase64 = function(str) {
        if(!str || str.trim().length === 0) {
            throw new Error("Invalid STRING: " + str);
        }
        var decoded = Base64.decode(str);
        return new ByteString(decoded);
    };

    ByteString.ascii = function(str) {
        var data = str.split("").map(function(val) {
            return val.charCodeAt(0);
        });

        return new ByteString(data);
    };

    return ByteString;
    /*
     *if(typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
     *    module.exports = ByteString;
     *}
     */
});
