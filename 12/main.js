const input = require('./input');

const cpyRegex = /cpy (.+?) (\w)/;
const incRegex = /inc (\w)/;
const decRegex = /dec (\w)/;
const jumpRegex = /jnz (\w) (.+)/;

const registers = {
    a: 0,
    b: 0,
    c: 1,
    d: 0
};

let i = 0;

while (input[i]) {
    const inst = input[i];

    if (inst.match(cpyRegex)) {
        const matches = cpyRegex.exec(inst);
        const value = parseInt(matches[1]);

        const toRegister = matches[2];

        if (isNaN(value)) {
            const fromRegister = matches[1];
            registers[toRegister] = registers[fromRegister];
        } else {
            registers[toRegister] = value;
        }
        i++;
    }

    if (inst.match(incRegex)) {
        const [, register] = incRegex.exec(inst);
        registers[register] = registers[register] + 1;
        i++;
    }

    if (inst.match(decRegex)) {
        const [, register] = decRegex.exec(inst);
        registers[register] = registers[register] - 1;
        i++;
    }

    if (inst.match(jumpRegex)) {
        const matches = jumpRegex.exec(inst);
        const value = parseInt(matches[2]);
        const register = matches[1];
        if (registers[register] !== 0) {
            i = i + value;
        } else {
            i++;
        }
    }
}

console.log(registers);