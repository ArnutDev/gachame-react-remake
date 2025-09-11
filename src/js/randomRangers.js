import {
    getGrade,
    getAllRandom,
    getRandomPickRanger,
    getRangersOddMonth,
    getRangersEvenMonth,
    getSpecial
} from "./utils.js";



export default async function normalGacha(allRangers, gachaConfig) {
    let rangers = [];
    let specials = Array(7).fill(false);
    let specialsCountArray;
    const randomStart = 1; //0
    const randomEnd = 1; //100
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
                [rangersJson, specials] = getRangersOddMonth(result, indexJson8U, indexJson8USpecial, i, allRangers, gachaConfig);
            } else {
                const grade = "Ultra";
                [rangersJson, specials] = getRangersEvenMonth(grade, result, indexJson8U, indexJson8USpecial, i, allRangers, gachaConfig);
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
                [rangersJson, specials] = getRangersOddMonth(result, indexJson8C, indexJson8CSpecial, i, allRangers, gachaConfig);
            } else {
                const grade = "Common";
                [rangersJson, specials] = getRangersEvenMonth(grade, result, indexJson8C, indexJson8CSpecial, i, allRangers, gachaConfig);
            }
        } else {
            rangersJson = [...allRangers[1]]; //7c
            specials[i] = false
        }
        const randomIndex = getRandomPickRanger(0, rangersJson.length - 1);
        rangers[i] = rangersJson[randomIndex];
        [specials[i], specialsCountArray] = getSpecial(gachaConfig, rangers[i], allRangers[5], allRangers[4]);
        // console.log(rangersJson) //test
    }
    console.log("before return specials:", specials);

    return [rangers, specials, specialsCountArray];
    //ไฮไลท์อันที่ special ให้เป็นหน้าที่ของ UI 
    //ทำระบบนับ ruby, สถิติ และระบบ การันตี
    // count += 6;
    // if (count / 100 >= freeBoxCount) {
    //     freeBoxCount++;
    //     document.getElementById("btn-guarantee").style.display = "block";
    // }
}
// async function guarantee(type) {
//     const divSlots = document.querySelectorAll('.content-display'); // select 7 div
//     divSlots.forEach(slot => (slot.innerHTML = '')); // clear old data

//     setTimeout(async () => {
//         let specialJson;
//         let grade = "8 star";
//         let special = true;
//         //rate-normal using the same rate like the others
//         //add new special gears to this path first
//         specialJson = await loadJSON('assets/json-data/rangers/8c-info-special.json');

//         const randomIndex = getRandomPickRanger(0, specialJson.length - 1);
//         let rangers = specialJson[randomIndex];
//         // เพิ่มข้อมูลใน div
//         if (divSlots[5]) {
//             let border = ``;
//             if (special) {
//                 if (await getStat(rangers)) { //when use async function dont forget await
//                     border = `border border-success border-5`;
//                     special = false;
//                 }
//             }
//             divSlots[5].innerHTML = `
//                 <div class="p-2 ${border} rounded">
//                     <div class="image-box d-flex justify-content-center align-items-center" style="height: 100px;">
//                         <img src="${rangers.Image}" alt="${rangers.Name}" class="img-fluid" style="max-height: 80px;">
//                     </div>
//                     <p><strong>Grade:</strong> ${grade}</p>
//                     <p class="mt-2"><strong>Name:</strong> ${rangers.Name}</p>
//                 </div>
//             `;
//         }
//         // อัปเดตจำนวนรวม
//         document.getElementById("normal-count").innerHTML = ` ${count}, Ruby used: ${count * 300}`;
//         document.getElementById("u-ranger-1").innerHTML = u1;
//         document.getElementById("u-ranger-2").innerHTML = u2;
//         document.getElementById("u-ranger-3").innerHTML = u3;
//         document.getElementById("u-ranger-4").innerHTML = u4;
//     }, 300);
//     if (type == 1) {
//         document.getElementById("btn-guarantee").style.display = "none";
//     }
//     document.getElementById("randomButton").style.display = "none";
// }

// async function getStat(data) {
//     const collabUltraJson = await loadJSON('assets/json-data/rangers/8u-info-special.json'); //comprehensive
//     const collabCommonJson = await loadJSON('assets/json-data/rangers/8c-info-special.json'); //comprehensive

//     //use for store result
//     let result = -1; // use -1 for not found any value when start check

//     // ตรวจสอบว่า data.Name ตรงกับข้อมูลใน collabUltraJson หรือไม่
//     for (let index = 0; index < collabUltraJson.length; index++) {
//         if (collabUltraJson[index].Name === data.Name) {
//             // if match then keep index value in result variable and +1 when even month has come 
//             // and remove +1 when collabro come
//             result = index;
//             break; // found stop the loop
//         }
//     }
//     if (result == -1) {
//         for (let index = 0; index < collabCommonJson.length; index++) {
//             if (collabCommonJson[index].Name === data.Name) {
//                 result = index; // if match then keep index value in result variable 
//                 break; // found stop the loop
//             }
//         }
//     }
//     if (result == 0) { // light/dark | co-main1
//         u1++;
//     } else if (result == 1) { // sub1 | co-main2
//         u2++;
//     } else if (result == 2) { // sub2 | co-sub1
//         u3++;
//     } else if (result == 3) { // none | co-sub2
//         u4++;
//     } else {
//         return false;
//     }
//     return true;
// }