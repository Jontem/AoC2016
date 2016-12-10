const instructions = require("./input");

const screenX = 50;
const screenY = 6;

let screen = blankScreen();

for (const instruction of instructions) {
    const parsedInstruction = parseInstruction(instruction);

    screen = executeInstruction(parsedInstruction, screen);
}

printScreen(screen);

const littedPixels = screen.reduce((soFar, row) => soFar + row.filter((col) => col === "#").length, 0);

console.log(`Litted: ${littedPixels}`);

function executeInstruction(parsedInstruction, screen) {
    if (parsedInstruction.op === "rect") {
        for (let row = 0; row < parsedInstruction.y; row++) {
            for (let col = 0; col < parsedInstruction.x; col++) {
                screen[row][col] = "#";
            }
        }
    }

    if (parsedInstruction.op === "rotaterow") {
        let row = screen[parsedInstruction.y];
        const moves = parsedInstruction.by % screenX;

        for (let i = 0; i < moves; i++) {
            const lastPixel = row[screenX - 1];
            row = [].concat(lastPixel, row.slice(0, screenX - 1));
        }

        screen[parsedInstruction.y] = row;
    }

    if (parsedInstruction.op === "rotatecol") {
        const colIndex = parsedInstruction.x;
        let col = screen.map((row) => row[colIndex]);
        const moves = parsedInstruction.by % screenY;

        for (let i = 0; i < moves; i++) {
            const lastPixel = col[screenY - 1];
            col = [].concat(lastPixel, col.slice(0, screenY - 1));
        }

        for (let rowIndex = 0; rowIndex < screen.length; rowIndex++) {
            screen[rowIndex][colIndex] = col[rowIndex];
        }

    }

    return screen;
}

function parseInstruction(instruction) {
    const rectRegex = /rect (\d+?)x(\d+)/;
    const rotateRowRegex = /rotate row y=(\d+?) by (\d+)/;
    const rotateColRegex = /rotate column x=(\d+?) by (\d+)/;

    if (instruction.match(rectRegex)) {
        const [, x, y] = rectRegex.exec(instruction);
        return {
            op: "rect",
            x,
            y,
        }
    } else if (instruction.match(rotateRowRegex)) {
        const [, y, by] = rotateRowRegex.exec(instruction);

        return {
            op: "rotaterow",
            y,
            by
        };
    } else if (instruction.match(rotateColRegex)) {
        const [, x, by] = rotateColRegex.exec(instruction);

        return {
            op: "rotatecol",
            x,
            by
        };
    }
}

function blankScreen() {
    const screen = [];
    for (let row = 0; row < screenY; row++) {
        screen[row] = [];
        for (let col = 0; col < screenX; col++) {
            screen[row][col] = " ";
        }
    }

    return screen;
}

function printScreen(screen) {
    for (let row = 0; row < screenY; row++) {
        let pixels = "";
        for (let col = 0; col < screenX; col++) {
            pixels += screen[row][col];
        }
        console.log(pixels);
    }
}