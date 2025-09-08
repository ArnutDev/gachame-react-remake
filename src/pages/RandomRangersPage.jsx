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
      gachaConfig: {      // สำหรับ logic สุ่ม
        amount: 4,
        eachRateUltra: 0.12,
        eachRateCommon: 0.88,
        rangerIndex1: -1,
        rangerIndex2: -1,
        unRateUp1:-1,
        unRateUp2:-1
      }
    },
    {
      cardInfo: {          // สำหรับ <RangerCard>
        title: "box2",
        image: "https://example.com/images/ranger-red.png",
        info: "xxx"
      },
      gachaConfig: {      // สำหรับ logic สุ่ม
        amount: 2,
        eachRateUltra: 0.18,
        eachRateCommon: 1.32,
        rangerIndex1: 0,
        rangerIndex2: 1,
        unRateUp1:2,
        unRateUp2:3
      }
    },
    {
      cardInfo: {          // สำหรับ <RangerCard>
        title: "box3",
        image: "https://example.com/images/ranger-red.png",
        info: "xxx"
      },
      gachaConfig: {      // สำหรับ logic สุ่ม
        amount: 2,
        eachRateUltra: 0.18,
        eachRateCommon: 1.32,
        rangerIndex1: 2,
        rangerIndex2: 3,
        unRateUp1:1,
        unRateUp2:2
      }
    }
  ]
  const rangersPaths = [
    '/src/assets/json-data/rangers/rate-normal/7u-info.json',
    '/src/assets/json-data/rangers/rate-normal/7c-info.json',
    '/src/assets/json-data/rangers/rate-normal/8u-info.json',
    '/src/assets/json-data/rangers/rate-normal/8c-info.json',
    '/src/assets/json-data/rangers/8c-info-special.json',
    '/src/assets/json-data/rangers/8u-info-special.json'
  ];
  // console.log(rangersPaths)
  useEffect(() => {
    async function loadAllFiles() {
      // โหลดทุกไฟล์พร้อมกัน
      const promises = rangersPaths.map(path => fetch(path).then(res => res.json()));
      const dataArray = await Promise.all(promises);
      setAllRangers(dataArray);
    }

    loadAllFiles();
  }, []);
  const handleRandom = async (gachaConfig) => {
    const [slots,specials] = await normalGacha(allRangers,gachaConfig.amount,gachaConfig.eachRateUltra,gachaConfig.eachRateCommon, gachaConfig.rangerIndex1,gachaConfig.rangerIndex2,gachaConfig.unRateUp1,gachaConfig.unRateUp2);

    //del this
    // const slots = data;
    //
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
