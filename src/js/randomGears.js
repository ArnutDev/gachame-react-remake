import {
    getGrade,
    getAllRandom,
    getRandomPickRanger,
    getGearsOddMonth,
    // getGearsEvenMonth,
    getSpecialGear
} from "./utils.js";


export default async function gearsGacha(allGears, gachaConfig) {
    let gears = [];
    let specials = Array(6).fill(false);
    let specialsCountGearsArray;
    let check6StarSpecial = false;
    const randomStart = 0; //0
    const randomEnd = 100; //100
    for (let i = 0; i < 6; i++) {
        const chance = getGrade(randomStart, randomEnd);
        let gearsJson = [];
        if (chance <= 1) {
            const rateRange = 1.00;
            let result
            if (randomStart !== randomEnd) {
                result = getAllRandom(gachaConfig.amount8c, gachaConfig.eachRate8c, rateRange);
            } else { //for test
                result = false;
            }
            const indexJsonNormal = 3;
            const indexJsonSpecial = 4;
            const grade = "8 star";
            if (gachaConfig.month === "odd") {
                const [gears, isSpecials] = getGearsOddMonth(grade, indexJsonNormal, indexJsonSpecial, result, i, allGears, gachaConfig);
                gearsJson = gears;
                specials[i] = isSpecials;
            } else {
                // const [gears, isSpecials] = getGearsEvenMonth(grade, result, indexJson8U, indexJson8USpecial, i, allGears, gachaConfig);;
                // gearsJson = gears;
                // specials[i] = isSpecials;
            }
        } else if (chance <= 3) {
            const rateRange = 22.00; //7c
            let result;
            if (randomStart !== randomEnd) {
                result = getAllRandom(gachaConfig.amount7c, gachaConfig.eachRate7c, rateRange);
            } else { //for test
                result = false;
            }
            const indexJsonNormal = 2;
            const indexJsonSpecial = 4;
            const grade = "7 star";
            if (gachaConfig.month === "odd") {
                const [gears, isSpecials] = getGearsOddMonth(grade, indexJsonNormal, indexJsonSpecial, result, i, allGears, gachaConfig);
                gearsJson = gears;
                specials[i] = isSpecials;
            } else {
                // const [gears, isSpecials] = getGearsEvenMonth(grade, result, indexJson8C, indexJson8CSpecial, i, allGears, gachaConfig);
                // gearsJson = gears;
                // specials[i] = isSpecials;
            }
        } else if (chance <= 50) {
            const rateRange = 22.00; //7c
            let result;
            if (randomStart !== randomEnd) {
                result = getAllRandom(gachaConfig.amount6c, gachaConfig.eachRate6c, rateRange);
            } else { //for test
                result = false;
            }
            if (!result) {
                gearsJson = [...allGears[1]]; //6c
                specials[i] = false
            } else {
                const gear6Star = [...allGears[4]]
                gears[i] = gear6Star[5]; //6c special
                console.log(gears[i])
                specials[i] = true
                check6StarSpecial = true;
            }

        } else {
            gearsJson = [...allGears[0]]; //5c
            specials[i] = false
        }
        // console.log(gearsJson)
        if (!check6StarSpecial) {
            const randomIndex = getRandomPickRanger(0, gearsJson.length - 1);
            gears[i] = gearsJson[randomIndex];
        }
        // console.log(gears);
        [specials[i], specialsCountGearsArray] = getSpecialGear(gears[i], allGears[4]);
        // console.log(gearsJson) //test
    }
    // console.log("before return specials:", specials);
    // console.log('specialsCountGearsArray', specialsCountGearsArray.length)
    return [gears, specials, specialsCountGearsArray];
}