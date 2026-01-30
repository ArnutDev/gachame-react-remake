export function getRangersGachaData() {
    return [{
            cardInfo: {
                cardId: 1,
                title: "Gacha Rangers 6+1 Click!",
                image: "https://gachame.github.io/images/banner-gacha/rangers-banner-box-A.png",
                info: "Odds-up:\n - Qin Shi\n - Hades\n - Tesla\n - Apollo"
            },
            gachaConfig: {
                // month: "even",
                // rateUp: false,
                // amountUltra: 2,
                // amountCommon: 3,
                // eachRateUltra: 0.02,
                // eachRateCommon: 0.15,
                // rateUp8UIndex1: -1,
                // rateUp8CIndex1: -1,
                // rateUp8CIndex2: -1,
                // unRateUp8UIndex1: -1,
                month: "odd",
                rateUp: false,
                amountUltra: 4,
                amountCommon: 4,
                eachRateUltra: 0.12,
                eachRateCommon: 0.88,
                rateUpIndex1: -1,
                rateUpIndex2: -1,
                unRateUpIndex1: -1,
                unRateUpIndex2: -1
            }
        },
        {
            cardInfo: {
                // boxId: 2,       
                title: "Gacha Rangers 6+1 Click!",
                image: "https://gachame.github.io/images/banner-gacha/rangers-banner-box-B.png",
                info: "Odds-up:\n - Qin Shi\n - Hades\n"
            },
            gachaConfig: {
                // month: "even",
                // rateUp: true,
                // amountUltra: 2,
                // amountCommon: 3,
                // eachRateUltra: 0.22,
                // eachRateCommon: 1.50,
                // rateUp8UIndex1: 0,
                // unRateUp8UIndex1: 1,
                // rateUp8CIndex1: 0,
                // rateUp8CIndex2: 1,
                // unRateUp8CIndex1: 2,
                month: "odd",
                rateUp: true,
                amountUltra: 2,
                amountCommon: 2,
                eachRateUltra: 0.18,
                eachRateCommon: 1.32,
                rateUpIndex1: 1,
                rateUpIndex2: 2,
                unRateUpIndex1: 0,
                unRateUpIndex2: 3
            }
        },
        {
            cardInfo: {
                // boxId: 3,
                title: "Gacha Rangers 6+1 Click!",
                image: "https://gachame.github.io/images/banner-gacha/rangers-banner-box-C.png",
                info: "Odds-up:\n - Tesla\n - Apollo\n"
            },
            gachaConfig: {
                // month: "even",
                // rateUp: true,
                // amountUltra: 2,
                // amountCommon: 3,
                // eachRateUltra: 0.22,
                // eachRateCommon: 1.50,
                // rateUp8UIndex1: 1,
                // unRateUp8UIndex1: 0,
                // rateUp8CIndex1: 0,
                // rateUp8CIndex2: 2,
                // unRateUp8CIndex1: 1,
                month: "odd",
                rateUp: true,
                amountUltra: 2,
                amountCommon: 2,
                eachRateUltra: 0.18,
                eachRateCommon: 1.32,
                rateUpIndex1: 0,
                rateUpIndex2: 3,
                unRateUpIndex1: 1,
                unRateUpIndex2: 2
            }
        }
    ]
}

export function getRangersGachaPath() {
    return [
        '/assets/json-data/rangers/rate-normal/7u-info.json', //0
        '/assets/json-data/rangers/rate-normal/7c-info.json', //1
        '/assets/json-data/rangers/rate-normal/8u-info.json', //2
        '/assets/json-data/rangers/rate-normal/8c-info.json', //3
        '/assets/json-data/rangers/8c-info-special.json', //4
        '/assets/json-data/rangers/8u-info-special.json' //5
    ];
}
export function getGearsGachaData() {
    return [{
            cardInfo: {
                cardId: 1,
                title: "Gacha Gears 6+1 Click!",
                image: "https://gachame.github.io/images/banner-gacha/gears-banner-box-A.png",
                info: "Odds-up:\n - Bident\n - Staff of Beelzebub\n - Moonlight of Artemis\n - Qin Shi's Eyemask\n - Tesla Coil\n - Hades' Clothes"
            },
            gachaConfig: {

                // month: "even",
                // rateUp: false,       
                // amountUltra: 2,
                // amountCommon: 3,
                // eachRateUltra: 0.02,
                // eachRateCommon: 0.15,
                // rateUp8UIndex1: -1,
                // rateUp8CIndex1: -1,
                // rateUp8CIndex2: -1,
                // unRateUp8UIndex1:-1,
                month: "odd",
                rateUp: false,
                amount8c: 3,
                amount7c: 2,
                amount6c: 1,
                eachRate8c: 0.60,
                eachRate7c: 1.25,
                eachRate6c: 4.55,
                rateUp8cIndex1: -1,
                unRateUp8cIndex1: -1,
                unRateUp8cIndex2: -1,
                rateUp7cIndex1: -1,
                unRateUp7cIndex1: -1,
            }
        },
        {
            cardInfo: {
                // boxId: 2,       
                title: "Gacha Gears 6+1 Click!",
                image: "https://gachame.github.io/images/banner-gacha/gears-banner-box-B.png",
                info: "Odds-up:\n - Bident\n - Qin Shi's Eyemask\n\n\n\n"
            },
            gachaConfig: {
                // month: "even",
                // rateUp: true,       
                // amountUltra: 2,
                // amountCommon: 3,
                // eachRateUltra: 0.22,
                // eachRateCommon: 1.50,
                // rateUp8UIndex1: 0,
                // unRateUp8UIndex1:1,
                // rateUp8CIndex1: 0,
                // rateUp8CIndex2: 1,
                // unRateUp8CIndex1:2,
                month: "odd",
                rateUp: true,
                amount8c: 3,
                amount7c: 2,
                amount6c: 1,
                eachRate8c: 0.60,
                eachRate7c: 1.25,
                eachRate6c: -1,
                rateUp8cIndex1: 0,
                unRateUp8cIndex1: 1,
                unRateUp8cIndex2: 2,
                rateUp7cIndex1: 3,
                unRateUp7cIndex1: 4,
            }
        },
        {
            cardInfo: {
                // boxId: 3,
                title: "Gacha Gears 6+1 Click!",
                image: "https://gachame.github.io/images/banner-gacha/gears-banner-box-C.png",
                info: "Odds-up:\n - Staff of Beelzebub\n - Qin Shi's Eyemask\n\n\n\n"
            },
            gachaConfig: {
                // month: "even",
                // rateUp: true,       
                // amountUltra: 2,
                // amountCommon: 3,
                // eachRateUltra: 0.22,
                // eachRateCommon: 1.50,
                // rateUp8UIndex1: 1,
                // unRateUp8UIndex1:0,
                // rateUp8CIndex1: 0,
                // rateUp8CIndex2: 2,
                // unRateUp8CIndex1:1,
                month: "odd",
                rateUp: true,
                amount8c: 3,
                amount7c: 2,
                amount6c: 1,
                eachRate8c: 0.60,
                eachRate7c: 1.25,
                eachRate6c: -1,
                rateUp8cIndex1: 1,
                unRateUp8cIndex1: 0,
                unRateUp8cIndex2: 2,
                rateUp7cIndex1: 3,
                unRateUp7cIndex1: 4,
            }
        },
        {
            cardInfo: {
                // boxId: 4,
                title: "Gacha Gears 6+1 Click!",
                image: "https://gachame.github.io/images/banner-gacha/gears-banner-box-D.png",
                info: "Odds-up:\n - Moonlight of Artemis\n - Qin Shi's Eyemask\n\n\n\n"
            },
            gachaConfig: {
                // month: "even",
                // rateUp: true,       
                // amountUltra: 2,
                // amountCommon: 3,
                // eachRateUltra: 0.22,
                // eachRateCommon: 1.50,
                // rateUp8UIndex1: 1,
                // unRateUp8UIndex1:0,
                // rateUp8CIndex1: 0,
                // rateUp8CIndex2: 2,
                // unRateUp8CIndex1:1,
                month: "odd",
                rateUp: true,
                amount8c: 3,
                amount7c: 2,
                amount6c: 1,
                eachRate8c: 0.60,
                eachRate7c: 1.25,
                eachRate6c: -1,
                rateUp8cIndex1: 2,
                unRateUp8cIndex1: 0,
                unRateUp8cIndex2: 1,
                rateUp7cIndex1: 3,
                unRateUp7cIndex1: 4,
            }
        }
    ]
}

export function getGearsGachaPath() {
    return [
        '/assets/json-data/gears/rate-normal/5c-info.json', //5
        '/assets/json-data/gears/rate-normal/6c-info.json', //6
        '/assets/json-data/gears/rate-normal/7c-info.json', //7
        '/assets/json-data/gears/rate-normal/8c-info.json', //8c
        '/assets/json-data/gears/gears-info-special.json' //all special
    ];
}