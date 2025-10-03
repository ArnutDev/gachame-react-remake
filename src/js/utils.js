// let count = 0;
// let freeBoxCount = 1;
let specialsCountRangersArray = [0, 0, 0, 0]; //change this arr number for rangers
let specialsCountGearsArray = [0, 0, 0, 0, 0, 0]; //change this arr number for gears

export function getGrade(min, max) {
    const result = parseFloat((Math.random() * (max - min) + min).toFixed(2));
    // console.log('chance by getGrade', result)
    return result;
}

export function getValue(min, max) {
    const result = parseFloat((Math.random() * (max - min) + min).toFixed(2));
    // console.log('chance by getValue', result)
    return result;
}

export function generateRandomRange(min, max, eachRate, amount) {
    const arr = [];

    function getValidRandomValue() {
        return Math.round((Math.random() * (max - min) + min) * 100) / 100;
    }

    function getValidPair() {
        let num1 = getValidRandomValue();
        let num2 = Math.round((num1 + eachRate) * 100) / 100;

        if (num2 > max) {
            num1 = Math.round((max - eachRate) * 100) / 100;
            num2 = max;
        }
        if (num1 < min) {
            num1 = min;
            num2 = Math.round((num1 + eachRate) * 100) / 100;
        }
        return [num1, num2];
    }

    let attempts = 0;
    while (arr.length < amount * 2) {
        if (attempts > 1000) {
            // console.warn(
            //     "Too many attempts, generating fallback evenly spaced ranges."
            // );

            // fallback: สร้าง pair ขนาด eachRate แบบเท่า ๆ กัน
            arr.length = 0; // reset
            const totalSpace = max - min;
            const step = totalSpace / amount;
            for (let i = 0; i < amount; i++) {
                const start = Math.round((min + i * step) * 100) / 100;
                const end = Math.round(Math.min(start + eachRate, max) * 100) / 100;
                arr.push(start, end);
            }
            break;
        }

        attempts++;

        const [num1, num2] = getValidPair();

        // ตรวจ overlap
        let overlap = false;
        for (let i = 0; i < arr.length; i += 2) {
            const a1 = arr[i],
                a2 = arr[i + 1];
            if ((num1 >= a1 && num1 <= a2) || (a1 >= num1 && a1 <= num2)) {
                overlap = true;
                break;
            }
        }

        if (!overlap) {
            arr.push(num1, num2);
        }
    }

    return arr;
}



export function checkValueInRange(value, arr) {
    // check if the given value is in the range.
    for (let i = 0; i < arr.length; i += 2) {
        if (value > arr[i] && value <= arr[i + 1]) {
            // if value between arr[i] and arr[i+1] then display
            // console.log(`Result: Value ${value} is within the range of arr[${i}] - arr[${i + 1}] ${arr[i]}> ${value} <${arr[i+1]}`);
            return true; // this mean got special
        }
    }
    //if the given value not in any range
    // console.log(`Result: Value ${value} is not within any range.`);
    return false; // this mean got Common
}

export function getRandomPickRanger(min, max) {
    const result = Math.floor(Math.random() * (max - min + 1)) + min;
    return result;
}

export function getAllRandom(amount, eachRate, rateRange) {
    const range = generateRandomRange(0.01, rateRange, eachRate, amount);
    const value = getValue(0.01, rateRange);
    const result = checkValueInRange(value, range);
    return result
}

export function getGuaranteedReward(type, itemJson) {
    const randomIndex = getRandomPickRanger(0, itemJson.length - 1);
    // console.log(randomIndex)
    const item = itemJson[randomIndex];
    for (let i = 0; i < itemJson.length; i++) {
        if (item.Name === itemJson[i].Name) {
            if (type === "ranger") {
                specialsCountRangersArray[i]++;
                return [item, specialsCountRangersArray];
            } else { //gear
                specialsCountGearsArray[i]++;
                return [item, specialsCountGearsArray];
            }
        }
    }

}

export function getSpecialRanger(gachaConfig, rangers, Json8USpecial, Json8CSpecial) {
    // console.log('at getSpecial');
    for (let i = 0; i < Json8CSpecial.length; i++) {
        if (rangers.Name === Json8CSpecial[i].Name) {
            specialsCountRangersArray[i]++;
            // console.log('at 8c', rangers.Name)
            return [true, specialsCountRangersArray]; // found at 8c
        }
    }
    for (let j = 0; j < Json8USpecial.length; j++) {
        if (rangers.Name === Json8USpecial[j].Name) {
            if (gachaConfig.month === "even") {
                specialsCountRangersArray[j + 1]++;
            } else {
                specialsCountRangersArray[j]++;
            }
            // console.log('at 8u', rangers.Name)
            return [true, specialsCountRangersArray]; // found at 8u
        }
    }

    return [false, specialsCountRangersArray];
}


export function getRangersOddMonth(result, indexJsonNormal, indexJsonSpecial, i, allRangers, gachaConfig) {
    let rangersJson = []
    let specials = []
    if (!result && gachaConfig.rateUp) {
        rangersJson = [...allRangers[indexJsonNormal]]; //8u-normal + 8u-special
        const specialJson = allRangers[indexJsonSpecial]; //8u
        //add unrate-up
        rangersJson.push(specialJson[gachaConfig.unRateUpIndex1]);
        rangersJson.push(specialJson[gachaConfig.unRateUpIndex2]);
        specials[i] = null; // need to call func at normalGacha after this
    } else if (result && gachaConfig.rateUp) {
        const specialJson = allRangers[indexJsonSpecial]; //8u-special
        rangersJson.push(specialJson[gachaConfig.rateUpIndex1]);
        rangersJson.push(specialJson[gachaConfig.rateUpIndex2]);
        specials[i] = true;
    } else if (!result && !gachaConfig.rateUp) {
        rangersJson = [...allRangers[indexJsonNormal]]; //8u-normal
        specials[i] = false
    } else {
        rangersJson = [...allRangers[indexJsonSpecial]]; //8u-special
        specials[i] = true;
    }
    return [rangersJson, specials];
}


export function getRangersEvenMonth(grade, result, indexJsonNormal, indexJsonSpecial, i, allRangers, gachaConfig) {
    let rangersJson = []
    let specials = []
    // console.log('even month')
    if (!result && gachaConfig.rateUp) {
        rangersJson = [...allRangers[indexJsonNormal]]; //8u-normal + 8u-special
        const specialJson = allRangers[indexJsonSpecial]; //8u
        //add unrate-up
        if (grade === "Common") {
            rangersJson.push(specialJson[gachaConfig.unRateUp8CIndex1]);
        } else {
            rangersJson.push(specialJson[gachaConfig.unRateUp8UIndex1]);
        }
        specials[i] = null; // need to call func at normalGacha after this
        // console.log('not get and rate-up:', rangersJson)
    } else if (result && gachaConfig.rateUp) {
        const specialJson = allRangers[indexJsonSpecial];
        if (grade === "Common") { //8c-special
            rangersJson.push(specialJson[gachaConfig.rateUp8CIndex1]);
            rangersJson.push(specialJson[gachaConfig.rateUp8CIndex2]);
        } else { //8u-special
            rangersJson.push(specialJson[gachaConfig.rateUp8UIndex1]);
        }
        specials[i] = true;
        // console.log('get and rate-up:', specials[i])
    } else { // unrate-up box
        rangersJson = [...allRangers[indexJsonNormal], ...allRangers[indexJsonSpecial]];
        specials[i] = null;
        // console.log('unrate-up:', rangersJson)
    }
    return [rangersJson, specials];
}

export function getGearsOddMonth(grade, indexJsonNormal, indexJsonSpecial, result, i, allGears, gachaConfig) {
    let gearsJson = []
    let specials = []
    if (!result && gachaConfig.rateUp) {
        gearsJson = [...allGears[indexJsonNormal]];
        const specialJson = allGears[indexJsonSpecial]; //special
        //add unrate-up
        if (grade === "8 star") {
            gearsJson.push(specialJson[gachaConfig.unRateUp8cIndex1]);
            gearsJson.push(specialJson[gachaConfig.unRateUp8cIndex2]);
        } else { // 7 star
            gearsJson.push(specialJson[gachaConfig.unRateUp7cIndex1]);
        }
        // console.log("f up")
        specials[i] = null; // need to call func at normalGacha after this
    } else if (result && gachaConfig.rateUp) {
        const specialJson = allGears[indexJsonSpecial]; //8c-special
        if (grade === "8 star") {
            gearsJson.push(specialJson[gachaConfig.rateUp8cIndex1]);
        } else { // 7 star
            gearsJson.push(specialJson[gachaConfig.rateUp7cIndex1]);
        }
        // console.log("t up")
        specials[i] = true;
    } else if (!result && !gachaConfig.rateUp) {
        gearsJson = [...allGears[indexJsonNormal]];
        specials[i] = false
        // console.log("f un")
    } else {
        const specialJson = [...allGears[indexJsonSpecial]];
        if (grade === "8 star") {
            for (let k = 0; k < 3; k++) {
                gearsJson.push(specialJson[k]);
            }
        } else if (grade === "7 star") {
            for (let k = 3; k < 5; k++) {
                gearsJson.push(specialJson[k]);
            }
        } else {
            gearsJson.push(specialJson[5]);
        }

        specials[i] = true;
        // console.log("t un")
    }
    return [gearsJson, specials];
}

export function getGearsEvenMonth(result, indexJsonNormal, indexJsonSpecial, i, allGears, gachaConfig) {
    let gearsJson = []
    let specials = []
    if (!result && gachaConfig.rateUp) {
        gearsJson = [...allGears[indexJsonNormal]]; //8c-normal
        const specialJson = allGears[indexJsonSpecial]; //8c-special
        //add unrate-up
        gearsJson.push(specialJson[gachaConfig.unRateUpIndex1]);
        gearsJson.push(specialJson[gachaConfig.unRateUpIndex2]);
        specials[i] = null; // need to call func at normalGacha after this
    } else if (result && gachaConfig.rateUp) {
        const specialJson = allGears[indexJsonSpecial]; //8c-special
        gearsJson.push(specialJson[gachaConfig.rateUpIndex1]);
        specials[i] = true;
    } else if (!result && !gachaConfig.rateUp) {
        gearsJson = [...allGears[indexJsonNormal]]; //8c-normal
        specials[i] = false
    } else { //result and unrate-up 
        gearsJson = [...allGears[indexJsonNormal]]; //8c-normal
        const specialJson = allGears[indexJsonSpecial];
        for (let i = 0; i < 3; i++) {
            gearsJson.push(specialJson[i]); //8c-special
        }
        specials[i] = true;
    }
    return [gearsJson, specials];
}

export function getSpecialGear(gear, JsonGearsSpecial) {
    // console.log('at getSpecial');
    // console.log(gear.length)
    for (let i = 0; i < JsonGearsSpecial.length; i++) {
        if (gear.Name === JsonGearsSpecial[i].Name) {
            specialsCountGearsArray[i]++;
            // console.log('at 8c', rangers.Name)
            return [true, specialsCountGearsArray]; // found at 8c
        }
    }

    return [false, specialsCountGearsArray];
}