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
