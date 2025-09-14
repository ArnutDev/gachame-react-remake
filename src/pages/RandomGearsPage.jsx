import { useState,useEffect } from "react";
import ItemCard from "../components/ItemCard";
import RandomModal from "../components/RandomModal";
import RangerFooter from "../components/RangerFooter";
import rangersGacha  from "../js/random.js";
import GuaranteeModal from "../components/GuaranteeModal.jsx";
import { getGuaranteedReward } from "../js/utils.js";


export default function RandomGearsPage() {
  const [allRangers, setAllRangers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentSlots, setCurrentSlots] = useState([]);
  const [currentSpecials, setCurrentSpecials] = useState([]);
  const [totalRandoms, setTotalRandoms] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [guaranteeButtonVisible, setGuaranteeButtonVisible] = useState(false);
  const [guaranteeModelOpen,setGuaranteeModelOpen] = useState(false);
  const [guaranteeReward,setguaranteeReward] = useState(null);
  const [specialCount, setSpecialCount] = useState([0,0,0]);//even
  // const [specialCount, setSpecialCount] = useState([0,0,0,0]);//odd
  const [currentCard, setCurrentCard] = useState(null);
  

  const data = [
    {
      cardInfo: {   
        cardId: 1,       
        title: "Gacha Rangers 6+1 Click!",
        image: "/src/assets/gacha-cover-image/banner-ranger-box-A.png",
        info: "Odds-up:\n - xxx\n - xxx\n - xxx"
      },
      gachaConfig: {
        
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
        // boxId: 2,       
        title: "Gacha Rangers 6+1 Click!",
        image: "/src/assets/gacha-cover-image/banner-ranger-box-B.png",
        info: "Odds-up:\n - xxx\n - xxx\n"
      },
      gachaConfig: {
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
        // boxId: 3,
        title: "Gacha Rangers 6+1 Click!",
        image: "/src/assets/gacha-cover-image/banner-ranger-box-C.png",
        info: "Odds-up:\n - xxx\n - xxx\n"
      },
      gachaConfig: {
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
    const [slots,specials,specialsCountArray] = await rangersGacha(allRangers,gachaConfig);
    // console.log("after return specials", specials);
    setCurrentSpecials(specials);
    
    setCurrentSlots(slots);
    setSpecialCount(specialsCountArray);

    // setSpecialCount(prev => prev + calculateSpecial(slots));
    setCurrentCard(gachaConfig);
    setModalOpen(true);
    setTotalCount(prev => prev+1);
    setTotalRandoms(prev => {
      const newTotal = prev + 6;

      if (newTotal >= 100) {
        setGuaranteeButtonVisible(true); 
        return newTotal - 100;           
      }

      return newTotal;
    });
  };

  const handleRandomAgain = () => {
    if (!currentCard) return;
    setModalOpen(false);
    setTimeout(() => handleRandom(currentCard), 400);
  };

  const handleGuaranteeClick = () => {
  console.log("กดปุ่มการันตีแล้ว");
  const [guaranteeResult,specialsCountArray] = getGuaranteedReward(allRangers[4]);
  setSpecialCount(specialsCountArray);
  setguaranteeReward(guaranteeResult);
  setGuaranteeModelOpen(true);
  setGuaranteeButtonVisible(false); // ซ่อนปุ่มหลังกด
};
  return (
    <div className="d-flex flex-column" style={{ minHeight: "auto" }}>
      <div className="flex-grow-1">
        <h2 className="my-3 text-center text-light">Gacha Rangers For October</h2>
        <div className="my-3 text-warning text-center">
          <p>
            Notice: You will receive a guaranteed box here every 100 gacha pulls.
            Please open immediately to receive it. (Random only — no selection available)
          </p>
          {guaranteeButtonVisible && (
            <button className="btn btn-success" onClick={handleGuaranteeClick}>
              Reward
            </button>
          )}
        </div>

        <div className="row flex-fill g-1 mx-3">
          {data.map((item, idx) => (
            <div key={idx} className="col-md-4 my-3">
              <ItemCard
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
          rubyCost={200}
          totalCount={totalCount}
          totalRandoms={totalRandoms}
          onClose={() => setModalOpen(false)}
          onRandomAgain={handleRandomAgain}
        />
      )}

      {guaranteeModelOpen && (
        <GuaranteeModal
          guaranteeReward={guaranteeReward}
          onClose={() => setGuaranteeModelOpen(false)}
        />
      )}
      
      <RangerFooter specialCount={specialCount} rangerDetails={allRangers[4] || []} />
      
 </div> );
}
