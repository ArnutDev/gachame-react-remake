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
    let arr = [];
    let countArr = 0;

    function getValidRandomValue() {
        let randomValue = (Math.random() * (max - min) + min).toFixed(2); // use toFixed(2) for 2 decimal
        return parseFloat(randomValue);
    }

    //check and random value not over range
    function getValidPair() {
        let num1 = getValidRandomValue();
        let num2 = (num1 + eachRate).toFixed(2); // use toFixed(2) for num2 2 decimal
        num2 = parseFloat(num2);

        // ตรวจสอบว่า num2 ไม่เกิน max และ num1 ยังไม่เกิน min
        if (num2 > max) {
            num1 = (max - eachRate).toFixed(2); // use toFixed(2) for num1 2 decimal
            num1 = parseFloat(num1);
            num2 = max;
        }

        // ตรวจสอบว่า num1 ยังอยู่ในช่วง min ถึง max
        if (num1 < min) {
            num1 = min; // ถ้า num1 ต่ำกว่า min, ตั้งให้ num1 เป็น min
            num2 = (num1 + eachRate).toFixed(2); // use toFixed(2) for num2 2 decimal
            num2 = parseFloat(num2);
        }

        return [num1, num2];
    }

    if (countArr < amount) {
        // random value of arr[0], arr[1]
        let pair1 = getValidPair();
        arr[0] = pair1[0];
        arr[1] = pair1[1];
        countArr++;
        // console.log('countArr', countArr, 'amount', amount)
    }
    if (countArr < amount) {
        //  random value of arr[2], arr[3]
        let pair2 = getValidPair();
        arr[2] = pair2[0];
        arr[3] = pair2[1];
        countArr++;
        // console.log('countArr', countArr, 'amount', amount)
    }
    if (countArr < amount) {
        //  random value of arr[4], arr[5]
        let pair3 = getValidPair();
        arr[4] = pair3[0];
        arr[5] = pair3[1];
        countArr++;
        // console.log('countArr', countArr, 'amount', amount)
    }
    if (countArr < amount) {
        //  random value of arr[6], arr[7]
        let pair4 = getValidPair();
        arr[6] = pair4[0];
        arr[7] = pair4[1];
        countArr++;
        // console.log('countArr', countArr, 'amount', amount)
    }
    for (let i = 0; i < arr.length; i += 2) {
        for (let j = i + 2; j < arr.length; j += 2) {
            //check for each range not overlap and have space not over eachRate
            if ((arr[i] >= arr[j] && arr[i] <= arr[j + 1]) || (arr[j] >= arr[i] && arr[j] <= arr[i + 1]) || (arr[i + 1] - arr[i] > eachRate) || (arr[j + 1] - arr[j] > eachRate)) {
                // if it overlap then random until not overlap
                // console.log("overlap try again!")
                return generateRandomRange(min, max, eachRate, amount);
            }
        }
    }

    // display position array that not overlap : 1-0, 2-3, 4-5, 6-7
    // console.log('ready for use!')
    for (let i = 0; i < arr.length; i += 2) {
        // console.log(`arr[${i}] - arr[${i + 1}] = ${arr[i]} - ${arr[i + 1]}`);
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

export function getSpecialGear(gears, JsonGearsSpecial) {
    // console.log('at getSpecial');
    for (let i = 0; i < JsonGearsSpecial.length; i++) {
        // console.log(gears.Name)
        if (gears.Name === JsonGearsSpecial[i].Name) {
            specialsCountGearsArray[i]++;
            // console.log('at 8c', rangers.Name)
            return [true, specialsCountGearsArray]; // found at 8c
        }
    }

    return [false, specialsCountGearsArray];
}