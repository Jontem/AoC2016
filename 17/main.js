const md5 = require("blueimp-md5");
const initial = "pxxbnzuo";

let position = {
    x: 0,
    y: 0
};

// up, down, left, and right
const directions = ["U", "D", "L", "R"];

const queue = [];
const completePaths = [];
const prevPositions = [];
let longest = 0;

queue.push({ position: position, path: initial })

while (current = queue.shift()) {
    const validMoves = getValidMoves(current.path, current.position);

    for (const validMove of validMoves) {
        if (moveIsComplete(validMove.position) && longest < validMove.path.length) {
            longest = validMove.path.length;
            completePaths.push(validMove);
        }

        if (!moveIsComplete(validMove.position)) {
            queue.push(validMove);
        }
    }
}

console.log(completePaths.sort((a, b) => b.path.length - a.path.length)[0].path.replace(initial, "").length);

function moveIsComplete(position) {
    return position.x === 3 && position.y === 3;
}

function getValidMoves(path, currentPos) {
    const openClosedStr = md5(path).substr(0, 4);
    const validPositions = openDoors(openClosedStr)
        .map((direction) => ({ position: move(direction, currentPos), path: createPath(path, direction) }))
        .filter((moved) => isValidPosition(moved.position))
        .filter((moved) => prevPositions.indexOf(moved.path) === -1);

    return validPositions;
}

function createPath(prevPath, direction) {
    return `${prevPath}${direction}`;
}

function isValidPosition(pos) {
    if (pos.x < 0 || pos.x > 3) {
        return false;
    }

    if (pos.y < 0 || pos.y > 3) {
        return false;
    }

    return true;
}

function move(direction, position) {
    if (direction === "U") {
        return createPosition(position.x, position.y - 1);
    }

    if (direction === "D") {
        return createPosition(position.x, position.y + 1);
    }

    if (direction === "L") {
        return createPosition(position.x - 1, position.y);
    }

    if (direction === "R") {
        return createPosition(position.x + 1, position.y);
    }

    throw new Error("Impossible move");
}

function createPosition(x, y) {
    return { x, y };
}

function openDoors(openClosedStr) {
    return Array.from(openClosedStr)
        .map((door, index) => isOpen(door) ? directions[index] : "")
        .filter((direction) => !!direction);
}

function isOpen(hex) {
    return parseInt(hex, 16) > 10;
}