import normalGacha from './randomRangers.js';

//use for test random results
const randomStart = 0; // standard 0 or test 8u=3-3, 8c=30-30
const randomEnd = 100; // standard 100
const amount = 4; // rate-up is 2 , unrate-up is 3(even month) or 4(collabro month)
const eachRate = 0.12; // This is unused in even months and unrate-up box
const rangerIndex1 = 0; // This is unused in even months and unrate-up box
const rangerIndex2 = 1; // This is unused in even months and unrate-up box

const [rangers, specials] = await normalGacha(randomStart, randomEnd, amount, eachRate, rangerIndex1, rangerIndex2);
for (let i = 0; i < rangers.length; i++) {
    console.log(i + 1, rangers[i].Name, specials[i]);
}