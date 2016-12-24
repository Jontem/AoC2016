let numberOfElfs = 3018458;
// let numberOfElfs = 5;

let firstElf = createElfs(numberOfElfs);

let elf = firstElf;
while (elf.id !== elf.next.id) {
    // console.log(numberOfElfs);
    const {oppositeElf, prevElf} = getOppositeElf(elf);
    const presentsTaken = oppositeElf.presents;
    prevElf.next = oppositeElf.next;
    numberOfElfs--;
    elf.presents += presentsTaken;
    elf = elf.next;
}
console.log(elf);
// printElfs(firstElf);

function getOppositeElf(elf) {
    // const numberOfElfs = countElfs(elf);

    const oppositeElfDelta = Math.floor(numberOfElfs / 2);

    let oppositeElf = elf;
    let prevElf;
    for (let i = 0; i < oppositeElfDelta; i++) {
        prevElf = oppositeElf;
        oppositeElf = oppositeElf.next;
    }

    return {
        prevElf,
        oppositeElf
    };
}
function getNextValidElf(rootElf) {
    let elf = rootElf;
    while (elf.next.id !== elf.id) {
        elf = elf.next;
        if (elf.id === rootElf.id) {
            break;
        }

        if (elf.presents > 0) {
            return elf;
        }
    }

    elf.next = null;
    return elf;
}

function countElfs(rootElf) {
    let elf = rootElf;
    let count = 1;
    while (elf) {
        elf = elf.next;
        if (elf.id === rootElf.id) {
            break;
        }
        count++;
    }

    return count;
}

function createElfs(numberOfEls) {
    const firstElf = createElf(1);
    let currentElf = firstElf;
    for (let i = 1; i < numberOfEls; i++) {
        currentElf.next = createElf(i + 1);
        currentElf = currentElf.next;
    }

    currentElf.next = firstElf;

    return firstElf;
}

function printElfs(rootElf) {
    let elf = rootElf;
    while (elf) {
        console.log(`elf: ${elf.id}, presents: ${elf.presents}`);
        elf = elf.next;

        if (elf.id === rootElf.id) {
            break;
        }
    }
}

function createElf(id) {
    return {
        id,
        presents: 1
    };
}