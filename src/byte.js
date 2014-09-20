define(['./ByteString'], function() {
/*
 *these util functions are for easy copy-pasting in broswer console
 */
function str_to_bytes(str) {
    var ch;
    var st;
    var res = [];
    var i;
    for(i=0; i<str.length; i++) {
        st = [];
        ch = str.charCodeAt(i);
        do {
            st.push(ch & 0xFF);
            ch = ch >> 8;
        }
        while(ch);
        
        st.reverse().map(function(val) {
            res.push(val);
            //return val;
        });
    }

    return res;
}

function repeatingKeyXOR(input, key) {
    if(typeof(input) !== "string" || typeof(key) !== "string") throw new Error("argument(s) are not String");

    var inBytes = str_to_bytes(input);
    var keyBytes = str_to_bytes(key);
    var res = [];

    var i, j, b;
    for(i=0, j=0; i<inBytes.length; i++) {
        j = j % keyBytes.length;
        b = inBytes[i] ^ keyBytes[j];
        res.push(b);
        j++;
    }

    return res;
}

function hexString(arr) {
    return arr
    .map(function(val) {
        var x = Number(val).toString(16);
        if(x.length === 1) {
            return "0" + x;
        } else {
            return x;
        }
    }).reduce(function(prev, curr) {
        return prev + curr;
    });
}

//test parameters
var input = "Burning 'em, if you ain't quick and nimble\nI go crazy when I hear a cymbal";
var key = "ICE";

function singlekeyXOR(h, c) {
    if (!(c instanceof ByteString) || !(h instanceof ByteString)) throw new Error("argument not a ByteString");
    if (c.ascii().length !== 1) throw new Error("second argument is not ascii char");

    var data = h.data.map(function(val) {
        return val ^ c.data[0];
    });
    return new ByteString(data);
}

function breakSinglekeyXOR(h) {
    if (!(h instanceof ByteString)) throw new Error("argument not a ByteString");

    var MAP = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    var ENG_FREQ = "EATOIN SHRDLCU".split("");
    var eng_freq = "EATOIN SHRDLCU".toLowerCase().split("");
    var obj = {};
    MAP.map(function(val) {
        var ch = ByteString.ascii(val);
        var decoded = singlekeyXOR(h, ch);
        //console.log(decoded.data);
        var score = 0;
        decoded.data.map(function(val) {
            var arr = [];
            arr.push(val);
            var data = new ByteString(arr);
            var Escore = ENG_FREQ.indexOf(data.ascii());
            var escore = eng_freq.indexOf(data.ascii());
            if (Escore >= 0 || escore >= 0) score = score + 100;
            else if(MAP.indexOf(data.ascii()) >= 0) score++;
            else score--;
        });
        //console.log(ch, ": ", score);
        obj[ch.ascii()] = score;
    });
    return obj;
}

function sortObjByValue(obj) {
    var sortable = [];
    for(var keys in obj) {
        sortable.push([keys, obj[keys]]);
    }
    sortable.sort(function(a, b) {
        return b[1] - a[1];
    });
    return sortable.map(function(val) {
        return { ch: val[0], score: val[1] };
    });
}

//console.log(sortObjByValue(breakSinglekeyXOR(ByteString.decodeHex("1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736")))[0]);

return {
    sortObjByValue: sortObjByValue,
    breakSinglekeyXOR: breakSinglekeyXOR,
    singlekeyXOR: singlekeyXOR,
    repeatingKeyXOR: repeatingKeyXOR
};

}); //end of define
