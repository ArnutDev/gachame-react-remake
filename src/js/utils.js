export function getGrade(min, max) {
    const result = parseFloat((Math.random() * (max - min) + min).toFixed(2));
    console.log('chance by getGrade', result)
    return result;
}

export function getValue(min, max) {
    const result = parseFloat((Math.random() * (max - min) + min).toFixed(2));
    console.log('chance by getValue', result)
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
        console.log('countArr', countArr, 'amount', amount)
    }
    if (countArr < amount) {
        //  random value of arr[2], arr[3]
        let pair2 = getValidPair();
        arr[2] = pair2[0];
        arr[3] = pair2[1];
        countArr++;
        console.log('countArr', countArr, 'amount', amount)
    }
    if (countArr < amount) {
        //  random value of arr[4], arr[5]
        let pair3 = getValidPair();
        arr[4] = pair3[0];
        arr[5] = pair3[1];
        countArr++;
        console.log('countArr', countArr, 'amount', amount)
    }
    if (countArr < amount) {
        //  random value of arr[6], arr[7]
        let pair4 = getValidPair();
        arr[6] = pair4[0];
        arr[7] = pair4[1];
        countArr++;
        console.log('countArr', countArr, 'amount', amount)
    }
    for (let i = 0; i < arr.length; i += 2) {
        for (let j = i + 2; j < arr.length; j += 2) {
            //check for each range not overlap and have space not over eachRate
            if ((arr[i] >= arr[j] && arr[i] <= arr[j + 1]) || (arr[j] >= arr[i] && arr[j] <= arr[i + 1]) || (arr[i + 1] - arr[i] > eachRate) || (arr[j + 1] - arr[j] > eachRate)) {
                // if it overlap then random until not overlap
                console.log("overlap try again!")
                return generateRandomRange(min, max, eachRate, amount);
            }
        }
    }

    // display position array that not overlap : 1-0, 2-3, 4-5, 6-7
    console.log('ready for use!')
    for (let i = 0; i < arr.length; i += 2) {
        console.log(`arr[${i}] - arr[${i + 1}] = ${arr[i]} - ${arr[i + 1]}`);
    }
    return arr;
}

export function checkValueInRange(value, arr) {
    // check if the given value is in the range.
    for (let i = 0; i < arr.length; i += 2) {
        if (value > arr[i] && value <= arr[i + 1]) {
            // if value between arr[i] and arr[i+1] then display
            console.log(`Result: Value ${value} is within the range of arr[${i}] - arr[${i + 1}] ${arr[i]}> ${value} <${arr[i+1]}`);
            return true; // this mean got special
        }
    }
    //if the given value not in any range
    console.log(`Result: Value ${value} is not within any range.`);
    return false; // this mean got common
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