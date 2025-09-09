import { useState,useEffect } from "react";
import RangerCard from "../components/RangerCard";
import RandomModal from "../components/RandomModal";
import RangerFooter from "../components/RangerFooter";
import normalGacha  from "../js/randomRangers.js";

// import { doRandom, calculateSpecial } from "./utils";

export default function RandomRangersPage() {
  const [allRangers, setAllRangers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentSlots, setCurrentSlots] = useState([]);
  const [currentSpecials, setCurrentSpecials] = useState([]);
  const [totalRandoms, setTotalRandoms] = useState(0);
  const [specialCount, setSpecialCount] = useState(0);
  const [currentCard, setCurrentCard] = useState(null);
  const data = [
    {
      cardInfo: {          // สำหรับ <RangerCard>
        title: "box1",
        image: "https://example.com/images/ranger-red.png",
        info: "xxx"
      },
      gachaConfig: {
        month: "even",
        rateUp: false,       
        amountUltra: 2,
        amountCommon: 3,
        eachRateUltra: -1,
        eachRateCommon: -1,
        rangerIndex1: -1,
        rangerIndex2: -1,
        unRateUp1:-1,
        unRateUp2:-1
        // month: "odd",
        // rateUp: false,       
        // amountUltra: 4,
        // amountCommon: 4,
        // eachRateUltra: 0.12,
        // eachRateCommon: 0.88,
        // rangerIndex1: -1,
        // rangerIndex2: -1,
        // unRateUp1:-1,
        // unRateUp2:-1
      }
    },
    {
      cardInfo: {          
        title: "box2",
        image: "https://example.com/images/ranger-red.png",
        info: "xxx"
      },
      gachaConfig: {
        month: "even",
        rateUp: true,      
        amountUltra: 2,
        amountCommon: 2,
        eachRateUltra: 0.22,
        eachRateCommon: 1.50,
        rangerIndex1: 0,
        rangerIndex2: 1,
        unRateUp1:2,
        unRateUp2:-1
        // month: "odd",
        // rateUp: true,      
        // amountUltra: 2,
        // amountCommon: 2,
        // eachRateUltra: 0.18,
        // eachRateCommon: 1.32,
        // rangerIndex1: 0,//?? ultra and common
        // rangerIndex2: 1,//?? ultra and common
        // unRateUp1:2,
        // unRateUp2:3 
      }
    },
    {
      cardInfo: {          
        title: "box3",
        image: "https://example.com/images/ranger-red.png",
        info: "xxx"
      },
      gachaConfig: { 
        month: "even",
        rateUp: true,     
        amountUltra: 2,
        amountCommon: 2,
        eachRateUltra: 0.22,
        eachRateCommon: 1.50,
        rangerIndex1: 0,//?? ultra and common
        rangerIndex2: 1,//?? ultra and common
        unRateUp1:1,
        unRateUp2:-1 
        // month: "odd",
        // rateUp: true,     
        // amountUltra: 2,
        // amountCommon: 2,
        // eachRateUltra: 0.18,
        // eachRateCommon: 1.32,
        // rangerIndex1: 2,
        // rangerIndex2: 3,
        // unRateUp1:0,
        // unRateUp2:1 
      }
    }
  ]
  const rangersPaths = [
    '/src/assets/json-data/rangers/rate-normal/7u-info.json',//0
    '/src/assets/json-data/rangers/rate-normal/7c-info.json',//1
    '/src/assets/json-data/rangers/rate-normal/8u-info.json',//2
    '/src/assets/json-data/rangers/rate-normal/8c-info.json',//3
    '/src/assets/json-data/rangers/8c-info-special.json',//4
    '/src/assets/json-data/rangers/8u-info-special.json'//5
  ];
  // console.log(rangersPaths)
  useEffect(() => {
    async function loadAllFiles() {
      const promises = rangersPaths.map(path => fetch(path).then(res => res.json()));
      const dataArray = await Promise.all(promises);
      setAllRangers(dataArray);
    }

    loadAllFiles();
  }, []);

  const handleRandom = async (gachaConfig) => {
    const [slots,specials] = await normalGacha(allRangers,gachaConfig);
    setCurrentSpecials(specials);
    setCurrentSlots(slots);
    setTotalRandoms(prev => prev + 1);
    //del this
    setSpecialCount(prev => prev + 1);
    //

    // setSpecialCount(prev => prev + calculateSpecial(slots));
    setCurrentCard(gachaConfig);
    setModalOpen(true);
  };

  const handleRandomAgain = () => {
    if (!currentCard) return;
    setModalOpen(false);
    setTimeout(() => handleRandom(currentCard), 400);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="flex-grow-1">
        <h2 className="my-3 text-center text-light">Gacha Rangers For October</h2>
        <div className="row flex-fill">
          {data.map((item, idx) => (
            <div key={idx} className="col-md-4 my-3">
              <RangerCard 
                cardInfo={item.cardInfo} 
                onRandom={() => handleRandom(item.gachaConfig)} 
              />
            </div>
          ))}
        </div>
      </div>
      {modalOpen && (
        <RandomModal
          slots={currentSlots}
          specials={currentSpecials}
          totalRandoms={totalRandoms}
          onClose={() => setModalOpen(false)}
          onRandomAgain={handleRandomAgain}
        />
      )}
      <RangerFooter specialCount={specialCount} />
      
 </div> );
}
