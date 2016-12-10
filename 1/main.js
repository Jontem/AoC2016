const steps = ["R1", "L4", "L5", "L5", "R2", "R2", "L1", "L1", "R2", "L3", "R4", "R3", "R2", "L4", "L2", "R5", "L1", "R5", "L5", "L2", "L3", "L1", "R1", "R4", "R5", "L3", "R2", "L4", "L5", "R1", "R2", "L3", "R3", "L3", "L1", "L2", "R5", "R4", "R5", "L5", "R1", "L190", "L3", "L3", "R3", "R4", "R47", "L3", "R5", "R79", "R5", "R3", "R1", "L4", "L3", "L2", "R194", "L2", "R1", "L2", "L2", "R4", "L5", "L5", "R1", "R1", "L1", "L3", "L2", "R5", "L3", "L3", "R4", "R1", "R5", "L4", "R3", "R1", "L1", "L2", "R4", "R1", "L2", "R4", "R4", "L5", "R3", "L5", "L3", "R1", "R1", "L3", "L1", "L1", "L3", "L4", "L1", "L2", "R1", "L5", "L3", "R2", "L5", "L3", "R5", "R3", "L4", "L2", "R2", "R4", "R4", "L4", "R5", "L1", "L3", "R3", "R4", "R4", "L5", "R4", "R2", "L3", "R4", "R2", "R1", "R2", "L4", "L2", "R2", "L5", "L5", "L3", "R5", "L5", "L1", "R4", "L1", "R1", "L1", "R4", "L5", "L3", "R4", "R1", "L3", "R4", "R1", "L3", "L1", "R1", "R2", "L4", "L2", "R1", "L5", "L4", "L5"];

let position = {
    x: 0,
    y: 0
};

const Direction = {
    UP: 0,
    RIGHT: 1,
    BOTTOM: 2,
    LEFT: 3
};

let currentDirection = Direction.UP;

const madeSteps = [];

for (const step of steps) {
    const turn = step.substr(0, 1);
    const length = parseInt(step.substr(1));

    currentDirection = getDirection(currentDirection, turn);
    const from = position;
    const to = getNewPosition(currentDirection, length, position);
    const collision = getPossibleCollisions(from, to, madeSteps);

    if (collision) {
        position = collision;
        console.log("collision!");
        break;
    }

    position = to;
    madeSteps.push({from, to});
}
console.log(position);
console.log(`Number of blocks ${Math.abs(position.x) + Math.abs(position.y)}`);

function getDirection(currentDirection, turn) {
    if (turn === "R") {
        return (currentDirection + 1) > 3 ? Direction.UP : (currentDirection + 1);
    } else {
        return (currentDirection - 1) < 0 ? Direction.LEFT : (currentDirection - 1);
    }
}

function getNewPosition(currentDirection, length, currentPosition) {
    if (currentDirection === Direction.UP) {
        return {
            x: currentPosition.x,
            y: currentPosition.y + length
        };
    } else if (currentDirection === Direction.RIGHT) {
        return {
            x: currentPosition.x + length,
            y: currentPosition.y
        };
    } else if (currentDirection === Direction.BOTTOM) {
        return {
            x: currentPosition.x,
            y: currentPosition.y - length
        };
    } else {
        return {
            x: currentPosition.x - length,
            y: currentPosition.y
        };
    }
}

function getPossibleCollisions(from, to, madeSteps) {

    const horizontalStep = from.y === to.y;

    if (horizontalStep) {
        const collisionLine = madeSteps
            .filter((step) => step.from.x === step.to.x)
            .filter((step) => step.from.x !== from.x)
            .find((step) => crossingVerticalLine(from.x, to.x, from.y, step.from, step.to));

        return collisionLine && {
                x: collisionLine.from.x,
                y: from.y,
            };
    } else {
        const collisionLine = madeSteps
            .filter((step) => step.from.y === step.to.y)
            .filter((step) => step.from.y !== from.y)
            .find((step) => crossingHorizontalLine(from.x, from.y, to.y, step.from, step.to));

        if(collisionLine) {
            console.log("collision!!");
            console.log("from: ", from);
            console.log("to: ", to);
            console.log("collisionline: ", collisionLine);
        }

        return collisionLine && {
                x: from.x,
                y: collisionLine.from.y,
            };
    }

    return null;
}

function crossingHorizontalLine(x, fromY, toY, point1, point2) {
    const smallestX = Math.min(point1.x, point2.x);
    const biggestX = Math.max(point1.x, point2.x);

    const smallestY = Math.min(fromY, toY);
    const biggestY = Math.max(fromY, toY);

    if (x >= smallestX && x <= biggestX) {
        if (point1.y >= smallestY && point1.y <= biggestY) {
            return true
        }
    }

    return false;
}

function crossingVerticalLine(fromX, toX, y, point1, point2) {
    const smallestY = Math.min(point1.y, point2.y);
    const biggestY = Math.max(point1.y, point2.y);

    const smallestX = Math.min(fromX, toX);
    const biggestX = Math.max(fromX, toX);

    if (y >= smallestY && y <= biggestY) {
        if (point1.y >= smallestX && point1.y <= biggestX) {
            return true;
        }
    }

    return false;
}