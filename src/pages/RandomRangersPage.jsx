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
  const [specialCount, setSpecialCount] = useState([0,0,0]);//even
  // const [specialCount, setSpecialCount] = useState([0,0,0,0]);//odd
  const [currentCard, setCurrentCard] = useState(null);
  const data = [
    {
      cardInfo: {          
        title: "box1",
        image: "https://example.com/images/ranger-red.png",
        info: "xxx"
      },
      gachaConfig: {
        boxId: 1,
        month: "even",
        rateUp: false,       
        amountUltra: 2,
        amountCommon: 3,
        eachRateUltra: 0.02,
        eachRateCommon: 0.15,
        rateUp8UIndex1: -1,
        rateUp8CIndex1: -1,
        rateUp8CIndex2: -1,
        unRateUp8UIndex1:-1,
        // boxId: 1,
        // month: "odd",
        // rateUp: false,       
        // amountUltra: 4,
        // amountCommon: 4,
        // eachRateUltra: 0.12,
        // eachRateCommon: 0.88,
        // rateUpIndex1: -1,
        // rateUpIndex2: -1,
        // unRateUpIndex1:-1,
        // unRateUpIndex2:-1
      }
    },
    {
      cardInfo: {          
        title: "box2",
        image: "https://example.com/images/ranger-red.png",
        info: "xxx"
      },
      gachaConfig: {
        boxId: 2,
        month: "even",
        rateUp: true,       
        amountUltra: 2,
        amountCommon: 3,
        eachRateUltra: 0.22,
        eachRateCommon: 1.50,
        rateUp8UIndex1: 0,
        unRateUp8UIndex1:1,
        rateUp8CIndex1: 0,
        rateUp8CIndex2: 1,
        unRateUp8CIndex1:2,
        // boxId: 2,
        // month: "odd",
        // rateUp: true,      
        // amountUltra: 2,
        // amountCommon: 2,
        // eachRateUltra: 0.18,
        // eachRateCommon: 1.32,
        // rateUpIndex1: 0,
        // rateUpIndex2: 1,
        // unRateUpIndex1:2,
        // unRateUpIndex2:3
      }
    },
    {
      cardInfo: {          
        title: "box3",
        image: "https://example.com/images/ranger-red.png",
        info: "xxx"
      },
      gachaConfig: {
        boxId: 3,
        month: "even",
        rateUp: true,       
        amountUltra: 2,
        amountCommon: 3,
        eachRateUltra: 0.22,
        eachRateCommon: 1.50,
        rateUp8UIndex1: 1,
        unRateUp8UIndex1:0,
        rateUp8CIndex1: 0,
        rateUp8CIndex2: 2,
        unRateUp8CIndex1:1,
        // boxId: 3,
        // month: "odd",
        // rateUp: true,     
        // amountUltra: 2,
        // amountCommon: 2,
        // eachRateUltra: 0.18,
        // eachRateCommon: 1.32,
        // rateUpIndex1: 2,
        // rateUpIndex2: 3,
        // unRateUpIndex1:0,
        // unRateUpIndex2:1 
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
    const [slots,specials,specialsCountArray] = await normalGacha(allRangers,gachaConfig);
    console.log("after return specials", specials);
    setCurrentSpecials(specials);
    
    setCurrentSlots(slots);
    setTotalRandoms(prev => prev + 1);
    setSpecialCount(specialsCountArray);//??

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
