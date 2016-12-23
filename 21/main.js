// swap position X with position Y
// swap letter X with letter Y
// rotate left/right X steps
// rotate based on position of letter X
// reverse positions X through Y
// move position X to position Y

const inputs = require("./input");
const commandRegex = /(\w+)\s(\w+)/;

const commands = {
    "swap letter": swapLetter,
    "swap position": swapPosition,
    "reverse positions": reversePositions,
    "rotate left": rotateLeft,
    "rotate right": rotateRight,
    "move position": movePosition,
    "rotate based": rotateBased,
}

let password = "abcde";
// let password = "fbgdceah";

for (const input of inputs) {
    const [command] = commandRegex.exec(input);
    password = commands[command](input, password);
}

console.log(password);

function rotateBased(input, str) {
    const regex = /rotate based on position of letter (\w)/
    const [, letter] = regex.exec(input);

    const pos = str.indexOf(letter);
    const additional = pos >= 4 ? 1 : 0;
    const effectivePos = pos + 1 + additional;

    return rotateStrRight(effectivePos, str);
}

function movePosition(input, str) {
    const regex = /move position (\d+?) to position (\d+)/
    let [, from, to] = regex.exec(input);

    from = parseInt(from);
    to = parseInt(to);

    const strArr = Array.from(str);
    const char = strArr[from];
    const removedArr = strArr.reduce((soFar, current, index) => {
        if (index !== from) {
            return soFar.concat(current);
        }

        return soFar;
    }, []);

    const firstPart = removedArr.slice(0, to);
    const secondPart = removedArr.slice(to);

    const completeString = firstPart
        .concat(char)
        .concat(secondPart);

    return arrayToStr(completeString);
}

function rotateLeft(input, str) {
    const regex = /rotate left (\d+?) step/
    let [, step] = regex.exec(input);
    step = parseInt(step);
    const correctSteps = step % str.length;
    const firstPart = str.substr(0, correctSteps);
    const secondPart = str.substr(correctSteps);

    return secondPart + firstPart;
}

function rotateRight(input, str) {
    const regex = /rotate right (\d+?) step/
    let [, step] = regex.exec(input);
    step = parseInt(step);
    return rotateStrRight(step, str);
}

function rotateStrRight(step, str) {
    const correctSteps = step % str.length;
    const secondPart = str.substr(str.length - correctSteps);
    const firstPart = str.substr(0, str.length - correctSteps);

    return secondPart + firstPart;
}

function reversePositions(input, str) {
    const regex = /reverse positions (\d+?) through (\d+?)/
    let [, pos1, [pos2]] = regex.exec(input);
    pos1 = parseInt(pos1);
    pos2 = parseInt(pos2);

    const firstPart = str.substring(0, pos1);
    const reversed = arrayToStr(Array.from(str.substring(pos1, pos2 + 1))
        .reverse());
    const secondPart = str.substring(pos2 + 1);

    return firstPart + reversed + secondPart;
}

function swapLetter(input, str) {

    const regex = /swap letter (\w) with letter (\w)/
    const [, letter1, letter2] = regex.exec(input);

    return arrayToStr(Array.from(str)
        .map((letter) => {
            if (letter === letter1) {
                return letter2;
            }

            if (letter === letter2) {
                return letter1;
            }

            return letter;
        }));
}

function swapPosition(input, str) {
    const regex = /swap position (\w) with position (\w)/
    let [, pos1, pos2] = regex.exec(input);
    pos1 = parseInt(pos1);
    pos2 = parseInt(pos2);

    let newStr = Array.from(str);
    const char1 = newStr[pos1];
    newStr[pos1] = newStr[pos2];
    newStr[pos2] = char1;

    return arrayToStr(newStr);
}

function arrayToStr(arr) {
    return arr.reduce((soFar, current) => soFar + current, "");
}