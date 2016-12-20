var md5 = require("blueimp-md5");
const input = "ngcjuoqr";
// const input = "abc";
const keys = [];
let count = 0;
const cache = {};

while (true) {
    const hashInput = input + count;
    const hash = cache[hashInput] || hash2016Additional(md5(hashInput));

    cache[hashInput] = hash;

    const tripleFoundChar = findCharTimes(3, hash);
    if (tripleFoundChar) {
        const fiveFoundChar = getFive(tripleFoundChar);
        let innerCount = 1;
        while (innerCount < 1000) {
            const hashInnerInput = `${input}${count + innerCount}`;
            const innerHash = cache[hashInnerInput] || hash2016Additional(md5(hashInnerInput));
            cache[hashInnerInput] = innerHash;
            if (innerHash.indexOf(fiveFoundChar) > -1) {
                /*console.log(count + innerCount);
                console.log(hash);*/
                keys.push(`${hashInput}:${hash}`);
                console.log(keys.length);
                break;
            }

            innerCount++;
        }
    }

    if (keys.length === 64) {
        for (const [index, key] of keys.entries()) {
            console.log(`index: ${index}: key: ${key}`);
        }
        break;
    }
    count++;
}

function hash2016Additional(hash) {
    for (let i = 0; i < 2016; i++) {
        hash = md5(hash);
    }

    return hash;
}

function getFive(char) {
    let str = "";

    for (let i = 0; i < 5; i++) {
        str += char;
    }

    return str;
}

function findCharTimes(times, str) {
    let prevChar = "";
    let foundTimes = 1;
    const strArr = Array.from(str);

    for (const [index, char] of strArr.entries()) {
        if (prevChar === char) {
            foundTimes++;
        } else {
            foundTimes = 1;
        }

        if (foundTimes === times) {
            return char;
        }

        prevChar = char;
    }
}