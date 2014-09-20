var ByteString = require('../src/ByteString');
var assert = require('assert');

describe('Sanity tests', function() {
    describe('ASCII encoding (verify BASE64 conversion)', function() {
        it("should generate BASE64 with no padding", function() {
            //console.log(ByteString);
            var b = ByteString.ascii('pleasure.');
            assert.equal(b.base64(), 'cGxlYXN1cmUu');
        });

        it("should generate BASE64 with 1 padding", function() {
            var b = ByteString.ascii('leasure.');
            assert.equal(b.base64(), 'bGVhc3VyZS4=');
        });

        it("should generate BASE64 with 2 padding", function() {
            var b = ByteString.ascii('easure.');
            assert.equal(b.base64(), 'ZWFzdXJlLg==');
        });

        it("should generate BASE64 with 0 padding", function() {
            var b = ByteString.ascii('asure.');
            assert.equal(b.base64(), 'YXN1cmUu');
        });

        it("should generate BASE64 with 1 padding", function() {
            var b = ByteString.ascii('sure.');
            assert.equal(b.base64(), 'c3VyZS4=');
        });
    });

    describe('BASE64 encoding', function() {
        describe('verify ASCII conversions', function() {
            it("should generate ASCII for 2 padding", function() {
                var b = ByteString.decodeBase64('YW55IGNhcm5hbCBwbGVhcw==');
                assert.equal(b.ascii(), 'any carnal pleas');
            });

            it("should generate ASCII for 1 padding", function() {
                var b = ByteString.decodeBase64('YW55IGNhcm5hbCBwbGVhc3U=');
                assert.equal(b.ascii(), 'any carnal pleasu');
            });

            it("should generate ASCII for 0 padding", function() {
                var b = ByteString.decodeBase64('YW55IGNhcm5hbCBwbGVhc3Vy');
                assert.equal(b.ascii(), 'any carnal pleasur');
            });
        });

        describe('verify HEX conversions', function() {
            it("should generate 1 byte HEX", function() {
                var b = ByteString.decodeBase64('/===');
                /*
                 *TODO: check what is expected here
                 */
                //assert.equal(b.hex(), 'fc');
            });

            it("should generate 'Hello World' HEX", function() {
                var b = ByteString.decodeBase64('SGVsbG8gV29ybGQ=');
                assert.equal(b.hex(), '48656c6c6f20576f726c64');
            });
        });
    });
});
