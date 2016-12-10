var md5 = require("blueimp-md5");

// const input = "abc";
const input = "reyedfim";
let i = 0;
let totalFound = 0;
const regex = /^00000([0-7])(.)/;
const arr = [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
];
while(true) {
    const hashInput = input + i;
    const hash = md5(hashInput);

    if(hash.match(regex)) {
        const [, placement, password] = regex.exec(hash);

        if(!arr[parseInt(placement)]) {
            totalFound++;
            console.log(`input: ${hashInput}`);
            console.log(`hash: ${hash} password: ${password}`);
            arr[parseInt(placement)] = password;
            console.log(arr);

            if(totalFound >= 8) {
                break;
            }
        }
    }
    i++;
}

console.log(arr.slice(0, 8));