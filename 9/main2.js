const fs = require("fs");
const logStream = fs.createWriteStream('output.txt', {'flags': 'a'});
const tempBuffer = fs.createWriteStream('temp.txt', {'flags': 'a'});
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

    const expression = after.substring(0, parseInt(letters));
    const expandedText = getExpressionText(expression, { letters, times});

    appendOutput(expandedText);

    restOfInput = after.substring(parseInt(letters));

}

appendOutput(restOfInput);
console.log(countExpressions(output, 1, 0));
console.log(output);


function countExpressions(expressions, multiplier, count) {
    while(expressions.length > 0) {
        const firstParen = expressions.indexOf("(");

        if(firstParen < 0) {
            return count + (multiplier * expressions.length);
        }

        if(firstParen > 0) {
            const charsBeforeParens = expressions.substring(0, firstParen).length;
            count += multiplier * charsBeforeParens;
        }

        const closingParen = findClosingParen(expressions, firstParen);

        const expression = expressions.substring(firstParen + 1, closingParen);
        const [match, subMultiplier] = /:(\d+?)$/.exec(expression);
        const subExpression = expression.substring(0, expression.length - match.length);

        count = countExpressions(subExpression, subMultiplier * multiplier, count);

        expressions = expressions.substring(closingParen+1);

        // const quantifier
    }

    return count;
}

function findClosingParen(expression, openPos) {
    let closePos = openPos;
    let counter = 1;
    while (counter > 0) {
        const c = expression[++closePos];
        if (c == '(') {
            counter++;
        }
        else if (c == ')') {
            counter--;
        }
    }
    return closePos;
}

function getExpressionText(expression, parentExpression) {
    if(!expression.match(regex)) {
        return quantify(expression, parseInt(parentExpression.times));
    }

    let expandedText = "";

    while(expression.match(regex)) {
        const [match, letters, times] = regex.exec(expression);
        const indexOfMatch = expression.indexOf(match);
        const before = expression.substring(0, indexOfMatch);

        const after = expression.substring(indexOfMatch + match.length);
        const subExpression = after.substring(0, parseInt(letters));
        expandedText += before + getExpressionText(subExpression, { letters, times: parseInt(times)});
        expression = after.substring(parseInt(letters));
    }

    return quantify(expandedText, parseInt(parentExpression.times));
}

function quantify(text, times) {

    return `(${text}:${times})`;
}

function quantifyText(text, times) {

    let returnedString = "";

    for (let i = 0; i < times; i++) {
        logStream.write(text);
    }

    return returnedString;
}

function appendOutput(text) {
    // logStream.write(text);
    output += text;
}