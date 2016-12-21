/*
Disc #1 has 17 positions; at time=0, it is at position 15.
Disc #2 has 3 positions; at time=0, it is at position 2.
Disc #3 has 19 positions; at time=0, it is at position 4.
Disc #4 has 13 positions; at time=0, it is at position 2.
Disc #5 has 7 positions; at time=0, it is at position 2.
Disc #6 has 5 positions; at time=0, it is at position 0.
*/
const discs = require("./input");

let time = 0;

while (true) {
    let ellapsedTime = time;
    for (const [index, disc] of discs.entries()) {
        ellapsedTime++;
        console.log(`time: ${ellapsedTime}`);
        const discDeltaPos = disc.initPosition + ellapsedTime;
        const discPos = discDeltaPos % disc.positions;
        console.log(`discPos: ${discPos}`);

        if ((discs.length - 1) === index && discPos === 0) {
            console.log(`finnished time: ${time}`);
            process.exit();
        }

        if (discPos !== 0) {
            break;
        }
    }
    time++;
}