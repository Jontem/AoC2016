const firstRow = "^.^^^..^^...^.^..^^^^^.....^...^^^..^^^^.^^.^^^^^^^^.^^.^^^^...^^...^^^^.^.^..^^..^..^.^^.^.^.......";
const rows = 400000;
let safeTiles = 0;

const finishedRows = [converInputToBinString(firstRow)];

for (let row = 1; row < rows; row++) {
    const prevRow = finishedRows[row - 1];
    let newRow = "";
    for (let col = 0; col < firstRow.length; col++) {
        const trap = isTrap(prevRow, col);
        newRow += trap ? 1 : 0;
        if (!trap) {
            safeTiles++;
        }
    }

    finishedRows.push(newRow);
}
//console.log(finishedRows);
console.log(safeTiles + countSafeTiles([converInputToBinString(firstRow)], 1));
//const convertedRows = convertToTrapString(finishedRows);
//console.log(convertedRows);
//console.log(countSafeTiles(convertedRows));

function countSafeTiles(finishedRows, rows) {
    let safeTiles = 0;
    for (let row = 0; row < rows; row++) {
        const currentRow = finishedRows[row];
        for (let col = 0; col < firstRow.length; col++) {
            if (currentRow[col] === "0") {
                safeTiles++;
            }
        }
    }

    return safeTiles;
}

function convertToTrapString(finishedRows) {
    const convertedRows = [];
    for (let row = 0; row < rows; row++) {
        let newRow = "";
        for (let col = 0; col < firstRow.length; col++) {
            newRow += finishedRows[row][col] === "0" ? "." : "^";
        }

        convertedRows.push(newRow);
    }

    return convertedRows;
}

function isTrap(prevRow, col) {
    const left = prevRow[col - 1] || 0;
    const center = prevRow[col];
    const right = prevRow[col + 1] || 0;

    const value = parseInt(`${left}${center}${right}`, 2);
    return value === 6 || value === 4 || value === 3 || value === 1;
}

function converInputToBinString(input) {
    return Array.from(input)
        .map((char) => {
            if (char === ".") {
                return 0;
            }
            return 1;
        })
        .reduce((soFar, current) => soFar + current, "");
}