export function getGachaData() {
    return [{
            cardInfo: {
                cardId: 1,
                title: "Gacha Rangers 6+1 Click!",
                image: "https://gachame.github.io/images/rangers/images-currently/banner-box-A.png",
                info: "Odds-up:\n - Rudo\n - Enjin\n - Riyo\n - Zanka"
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
                image: "https://gachame.github.io/images/rangers/images-currently/banner-box-B.png",
                info: "Odds-up:\n - Rudo\n - Enjin\n"
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
                rateUpIndex1: 0,
                rateUpIndex2: 1,
                unRateUpIndex1: 2,
                unRateUpIndex2: 3
            }
        },
        {
            cardInfo: {
                // boxId: 3,
                title: "Gacha Rangers 6+1 Click!",
                image: "https://gachame.github.io/images/rangers/images-currently/banner-box-C.png",
                info: "Odds-up:\n - Riyo\n - Zanka\n"
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
                rateUpIndex1: 2,
                rateUpIndex2: 3,
                unRateUpIndex1: 0,
                unRateUpIndex2: 1
            }
        }
    ]
}

export function getGachaPath() {
    return [
        '/src/assets/json-data/rangers/rate-normal/7u-info.json', //0
        '/src/assets/json-data/rangers/rate-normal/7c-info.json', //1
        '/src/assets/json-data/rangers/rate-normal/8u-info.json', //2
        '/src/assets/json-data/rangers/rate-normal/8c-info.json', //3
        '/src/assets/json-data/rangers/8c-info-special.json', //4
        '/src/assets/json-data/rangers/8u-info-special.json' //5
    ];
}