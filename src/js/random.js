import {
    getGrade,
    getAllRandom,
    getRandomPickRanger,
    getRangersOddMonth,
    getRangersEvenMonth,
    getGearsOddMonth,
    getGearsEvenMonth,
    getSpecialRanger
} from "./utils.js";

export async function rangersGacha(allRangers, gachaConfig) {
    let rangers = [];
    let specials = Array(7).fill(false);
    let specialsCountArray;
    const randomStart = 0; //0
    const randomEnd = 100; //100
    for (let i = 0; i < 7; i++) {
        const chance = getGrade(randomStart, randomEnd);
        let rangersJson = [];
        if (chance <= 3) {
            const rateRange = 3.00;
            let result
            if (randomStart !== randomEnd) {
                result = getAllRandom(gachaConfig.amountUltra, gachaConfig.eachRateUltra, rateRange);
            } else { //for test
                result = true;
            }
            const indexJson8U = 2;
            const indexJson8USpecial = 5;
            if (gachaConfig.month === "odd") {
                const [rangers, isSpecials] = getRangersOddMonth(result, indexJson8U, indexJson8USpecial, i, allRangers, gachaConfig);
                rangersJson = rangers;
                specials[i] = isSpecials;
            } else {
                const grade = "Ultra";
                const [rangers, isSpecials] = getRangersEvenMonth(grade, result, indexJson8U, indexJson8USpecial, i, allRangers, gachaConfig);;
                rangersJson = rangers;
                specials[i] = isSpecials;
            }
        } else if (chance <= 8) {
            rangersJson = [...allRangers[0]]; //7u
            specials[i] = false
        } else if (chance <= 30) {
            const rateRange = 22.00;
            let result;
            if (randomStart !== randomEnd) {
                result = getAllRandom(gachaConfig.amountCommon, gachaConfig.eachRateCommon, rateRange);
            } else { //for test
                result = true;
            }
            const indexJson8C = 3;
            const indexJson8CSpecial = 4;
            if (gachaConfig.month === "odd") {
                const [rangers, isSpecials] = getRangersOddMonth(result, indexJson8C, indexJson8CSpecial, i, allRangers, gachaConfig);
                rangersJson = rangers;
                specials[i] = isSpecials;
            } else {
                const grade = "Common";
                const [rangers, isSpecials] = getRangersEvenMonth(grade, result, indexJson8C, indexJson8CSpecial, i, allRangers, gachaConfig);
                rangersJson = rangers;
                specials[i] = isSpecials;

            }
        } else {
            rangersJson = [...allRangers[1]]; //7c
            specials[i] = false
        }
        const randomIndex = getRandomPickRanger(0, rangersJson.length - 1);
        rangers[i] = rangersJson[randomIndex];
        [specials[i], specialsCountArray] = getSpecialRanger(gachaConfig, rangers[i], allRangers[5], allRangers[4]);
        // console.log(rangersJson) //test
    }
    // console.log("before return specials:", specials);
    // console.log('specialsCountArray', specialsCountArray.length)
    return [rangers, specials, specialsCountArray];
}

export async function gearsGacha(allGears, gachaConfig) {
    let gears = [];
    let specials = Array(6).fill(false);
    let specialsCountArray;
    const randomStart = 0; //0
    const randomEnd = 100; //100
    for (let i = 0; i < 6; i++) {
        const chance = getGrade(randomStart, randomEnd);
        let gearsJson = [];
        if (chance <= 1) {
            const rateRange = 1.00;
            let result
            if (randomStart !== randomEnd) {
                result = getAllRandom(gachaConfig.amountUltra, gachaConfig.eachRateUltra, rateRange);
            } else { //for test
                result = true;
            }
            const indexJson8U = 2;
            const indexJson8USpecial = 5;
            if (gachaConfig.month === "odd") {
                const [gears, isSpecials] = getGearsOddMonth(result, indexJson8U, indexJson8USpecial, i, allGears, gachaConfig);
                gearsJson = gears;
                specials[i] = isSpecials;
            } else {
                const grade = "Ultra";
                const [gears, isSpecials] = getGearsEvenMonth(grade, result, indexJson8U, indexJson8USpecial, i, allGears, gachaConfig);;
                gearsJson = gears;
                specials[i] = isSpecials;
            }
        } else if (chance <= 3) {
            gearsJson = [...allGears[0]]; //7u
            specials[i] = false
        } else if (chance <= 50) {
            const rateRange = 22.00;
            let result;
            if (randomStart !== randomEnd) {
                result = getAllRandom(gachaConfig.amountCommon, gachaConfig.eachRateCommon, rateRange);
            } else { //for test
                result = true;
            }
            const indexJson8C = 3;
            const indexJson8CSpecial = 4;
            if (gachaConfig.month === "odd") {
                const [gears, isSpecials] = getGearsOddMonth(result, indexJson8C, indexJson8CSpecial, i, allGears, gachaConfig);
                gearsJson = gears;
                specials[i] = isSpecials;
            } else {
                const grade = "Common";
                const [gears, isSpecials] = getGearsEvenMonth(grade, result, indexJson8C, indexJson8CSpecial, i, allGears, gachaConfig);
                gearsJson = gears;
                specials[i] = isSpecials;

            }
        } else {
            gearsJson = [...allGears[1]]; //7c
            specials[i] = false
        }
        const randomIndex = getRandomPickRanger(0, gearsJson.length - 1);
        gears[i] = gearsJson[randomIndex];
        [specials[i], specialsCountArray] = getSpecialRanger(gachaConfig, gears[i], allGears[5], allGears[4]);
        // console.log(gearsJson) //test
    }
    // console.log("before return specials:", specials);
    // console.log('specialsCountArray', specialsCountArray.length)
    return [gears, specials, specialsCountArray];
}