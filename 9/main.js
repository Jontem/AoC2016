const fs = require("fs");
const logStream = fs.createWriteStream('output.txt', {'flags': 'a'});
const input = require("./input");


const regex = /\((\d+?)x(\d+?)\)/;

let restOfInput = input;

let output = "";

while (restOfInput.match(regex)) {
    const [match, letters, times] = regex.exec(restOfInput);
    const indexOfMatch = restOfInput.indexOf(match);
    const before = restOfInput.substring(0, indexOfMatch);
    appendOutput(before);

    const after = restOfInput.substring(indexOfMatch + match.length);
    const matchedLetters = after.substring(0, parseInt(letters));

    restOfInput = after.substring(parseInt(letters));

    appendOutput(quantify(matchedLetters, parseInt(times)));

}
// appendOutput(restOfInput);

console.log(output.length);

function quantify(text, times) {

    let returnedString = "";

    for (let i = 0; i < times; i++) {
        returnedString += text;
    }

    return returnedString;
}

function appendOutput(text) {
    // logStream.write(text);
    output += text;
}