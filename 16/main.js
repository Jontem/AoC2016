const initial = "10001001100000001";
const diskLength = 35651584;

let obfuscatedData = initial;

while(obfuscatedData.length < diskLength) {
    obfuscatedData = obfuscate(obfuscatedData);
}

console.log(obfuscatedData);
console.log(obfuscatedData.length);

const dataThatFits = obfuscatedData.substr(0, diskLength);

console.log(dataThatFits);
console.log(dataThatFits.length);

let checksum = getCheckSum(dataThatFits);

while(checksum.length % 2 === 0) {
    checksum = getCheckSum(checksum);
}

console.log("checksum: " + checksum);


function getCheckSum(str) {
    let checksum = "";
    for(let i=0;i<str.length;i+=2) {
        const same = isSame(str.substr(i, 2));
        checksum += same ? 1 : 0;
    }

    return checksum;
}

function isSame(str) {
    const strArray = Array.from(str);
    return strArray[0] === strArray[1];
}

function obfuscate(a) {
    const b = Array.from(a)
    .reverse()
    .map(char => negate(char))
    .reduce((soFar, current) => soFar + current, "");
    

    return `${a}0${b}`;
}

function negate(char) {
    if(char === "0") {
        return 1;
    } 

    return 0;
}