const ranges = parseInputs(require("./input"));
// console.log(ranges);
const filteredRanges = filterDuplicateRanges(ranges);
// console.log(filteredRanges);
/*for (const [index, range] of filteredRanges.entries()) {
    console.log(index)
    if (filteredRanges[index + 1].from - range.to > 1) {
        console.log(range.to + 1);
        break;
    }
}*/

const totalBlackList = filteredRanges
    .reduce((soFar, current) => soFar + (current.to - current.from), 0);
const max = 4294967295;
console.log(max - totalBlackList + 1);

function filterDuplicateRanges(ranges) {
    const filteredRanges = [];

    let lastRange;

    for (let i = 0; i < ranges.length; i++) {
        const range = ranges[i];
        if (!lastRange) {
            filteredRanges.push(range);
            lastRange = range;
            continue;
        }

        if (range.from > lastRange.to) {
            filteredRanges.push(range);
            lastRange = range;
        } else {
            lastRange.to = Math.max(range.to, lastRange.to);
        }
    }

    return filteredRanges;
}

function parseInputs(inputs) {
    const regex = /(\d+?)-(\d+)/;
    return inputs
        .map((input) => {
            const [, from, to] = regex.exec(input);

            return {
                from: parseInt(from, 10),
                to: parseInt(to, 10)
            };
        })
        .sort((a, b) => a.from - b.from);
}