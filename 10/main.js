const inputs = require("./input");

// value 41 goes to bot 117
const valueRegex = /value (\d+?) goes to bot (\d+?)$/;

// bot 82 gives low to bot 134 and high to bot 110
const botRegex = /bot (\d+?) gives low to (bot|output) (\d+?) and high to (bot|output) (\d+?)$/;

const botsAndBins = new Map();


for (const input of inputs) {
    if (input.match(botRegex)) {
        const [, botId, lowType, lowId, highType, highId] = botRegex.exec(input);
        botsAndBins.set(getId("bot", botId), {
            botId: getId("bot", botId),
            toLow: getId(lowType, lowId),
            toHigh: getId(highType, highId),
            type: "bot",
            chips: [],
        });

        if(lowType === "output" && !botsAndBins.has(getId("output", lowId))) {
            botsAndBins.set(getId("output", lowId), {
                botId: getId("output", lowId),
                toLow: null,
                toHigh: null,
                type: "bin",
                chips: [],
            });
        }

        if(highType === "output" && !botsAndBins.has(getId("output", highId))) {
            botsAndBins.set(getId("output", highId), {
                botId: getId("output", highId),
                toLow: null,
                toHigh: null,
                type: "bin",
                chips: [],
            });
        }
    }

    if (input.match(valueRegex)) {
    }
}

for (const input of inputs) {
    if (input.match(valueRegex)) {
        const [, value, botId] = valueRegex.exec(input);
        const bot = botsAndBins.get(getId("bot", botId));
        bot.chips.push(parseInt(value));
    }
}

const botsAndBinsArray = Array.from(botsAndBins.values());

while(botsAndBinsArray.find((bot) => bot.type === "bot" && bot.chips.length > 1)) {
    const bot = botsAndBinsArray.find((bot) => bot.chips.length > 1);
    const [chip1, chip2] = bot.chips;

    const lowBot = botsAndBins.get(bot.toLow);
    const highBot = botsAndBins.get(bot.toHigh);

    if((chip1 === 61 || chip1 === 17) && (chip2 === 61 || chip2 === 17)) {
        /*console.log(bot);
        break;*/
    }
   lowBot.chips.push(Math.min(chip1, chip2));
   highBot.chips.push(Math.max(chip1, chip2));

   bot.chips = [];
}

// console.log(botsAndBinsArray.filter((bot) => bot.botId.indexOf("bot") > -1));
console.log(botsAndBins.get(getId("output", 0)));
console.log(botsAndBins.get(getId("output", 1)));
console.log(botsAndBins.get(getId("output", 2)));

function getId(type, id) {
    return `${type}${id}`
}