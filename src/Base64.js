function Base64() {
    throw new Error("PRIVATE");
}

var MAP = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '/'
];

Base64.decode = function(str) {
    var arr = str.split("");
    var i, n, b;
    var base64Arr = [];
    for(i=0; i<arr.length; i++) {
        n = MAP.indexOf(arr[i]);
        if(n < 0) {
            //skip all unknown chars
            continue;
        }
        b = n.toString(2);
        if(b.length === 1) {
            b = "00000" + b;
        } else if(b.length === 2) {
            b = "0000" + b;
        } else if(b.length === 3) {
            b = "000" + b;
        } else if(b.length === 4) {
            b = "00" + b;
        } else if(b.length === 5) {
            b = "0" + b;
        } else if(b.length > 6) {
            continue;
            //throw new Error("Impossible BINARY: " + b);
        }
        base64Arr.push(b);
    }
    var combinedStr = base64Arr.reduce(function(prev, curr) {
        return prev + curr;
    });

    var start=0;
    var end=8;
    var binary, num;
    var res = [];
    do {
        var binary = combinedStr.slice(start, end);
        num = parseInt(binary, 2);
        res.push(num);
        start = end;
        end = end+8;
    }
    while(end <= combinedStr.length);

    return res;
}

Base64.encode = function(data) {
    var binary = data.map(function(val) {
        var b = val.toString(2);
        if(b.length === 1) {
            b = "0000000" + b;
        } else if (b.length === 2) {
            b = "000000" + b;
        } else if (b.length === 3) {
            b = "00000" + b;
        } else if (b.length === 4) {
            b = "0000" + b;
        } else if (b.length === 5) {
            b = "000" + b;
        } else if (b.length === 6) {
            b = "00" + b;
        } else if (b.length === 7) {
            b = "0" + b;
        }
        return b;
    }).reduce(function(prev, curr) {
        return prev + curr;
    });

    var flag = -1;
    if(data.length % 3 === 1) {
        binary = binary + "00000000" + "00000000";
        flag = 2;
    } else if(data.length % 3 === 2) {
        binary = binary + "00000000";
        flag = 1;
    }
    
    var start=0;
    var end=6;
    var bits, index, ch;
    var res = "";
    var len = binary.length / 6;
    var count = 0;
    do {
        count++;
        bits = binary.slice(start, end);
        index = parseInt(bits, 2);
        if((count === len-1 && flag === 2) || (count === len && flag === 1)) {
            flag--;
            ch = "=";
        } else {
            ch = MAP[index];
        }
        res = res+ch;
        start = end;
        end = end+6;
    }
    while(end <= binary.length);
    return res;
};

if(typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = Base64;
}
