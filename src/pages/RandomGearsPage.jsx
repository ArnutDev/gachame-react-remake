import { useState,useEffect } from "react";
import ItemCard from "../components/ItemCard";
import RandomModal from "../components/RandomModal";
import ItemFooter from "../components/ItemFooter.jsx";
import gearsGacha  from "../js/randomGears.js";
import GuaranteeModal from "../components/GuaranteeModal.jsx";
import { getGuaranteedReward } from "../js/utils.js";
import { getGearsGachaData,getGearsGachaPath } from "../js/gachaData.js";

export default function RandomGearsPage() {
  const [allGears, setAllGears] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentSlots, setCurrentSlots] = useState([]);
  const [currentSpecials, setCurrentSpecials] = useState([]);
  const [totalRandoms, setTotalRandoms] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [guaranteeButtonVisible, setGuaranteeButtonVisible] = useState(false);
  const [guarantee90, setGuarantee90] = useState(false);
  const [guarantee150, setGuarantee150] = useState(false);
  const [guaranteeModelOpen,setGuaranteeModelOpen] = useState(false);
  const [guaranteeReward,setguaranteeReward] = useState(null);
  // const [specialCount, setSpecialCount] = useState([0,0,0,0,0,0]);//even
  const [specialCount, setSpecialCount] = useState([0,0,0,0,0,0]);//odd
  const [currentCard, setCurrentCard] = useState(null);
  const [gachaData, setGachaData] = useState([]);

  useEffect(() => {
    const data = getGearsGachaData();
    setGachaData(data);
    const gearsPaths = getGearsGachaPath();
    async function loadAllFiles() {
      const promises = gearsPaths.map(path => fetch(path).then(res => res.json()));
      const dataArray = await Promise.all(promises);
      setAllGears(dataArray);
    }

    loadAllFiles();
  }, []);

  const handleRandom = async (gachaConfig) => {
    const [slots,specials,specialsCountArray] = await gearsGacha(allGears,gachaConfig);
    // console.log("after return specials", specials);
    setCurrentSpecials(specials);
    
    setCurrentSlots(slots);
    setSpecialCount(specialsCountArray);

    // setSpecialCount(prev => prev + calculateSpecial(slots));
    setCurrentCard(gachaConfig);
    setModalOpen(true);
    setTotalCount(prev => prev+1);
    setTotalRandoms(prev => {
      const newTotal = prev + 5;

    if (newTotal >= 150 && !guarantee150) {
        setGuarantee90(false);          
        setGuaranteeButtonVisible(true); 
        setGuarantee150(true);           
        return newTotal - 150;         
    } else if (newTotal >= 90 && !guarantee90) {
        setGuarantee90(true);            
        setGuaranteeButtonVisible(true); 
        setGuarantee150(false);          
    }
    return newTotal;
    });
  };

  const handleRandomAgain = () => {
    if (!currentCard) return;
    setModalOpen(false);
    setTimeout(() => handleRandom(currentCard), 500);
  };

  const handleGuaranteeClick = () => {
  // console.log("กดปุ่มการันตีแล้ว");
  const [guaranteeResult,specialsCountArray] = getGuaranteedReward("gear",allGears[4]);
  setSpecialCount(specialsCountArray);
  setguaranteeReward(guaranteeResult);
  setGuaranteeModelOpen(true);
  setGuaranteeButtonVisible(false); // ซ่อนปุ่มหลังกด
};
  return (
    <div className="d-flex flex-column" style={{ minHeight: "auto" }}>
      <div className="flex-grow-1">
        <h2 className="my-3 text-center text-light">Gacha Gears For December</h2>
        <div className="my-3 text-warning text-center">
          <p>
            Notice: You will receive a guaranteed box here every 90 and 150 gacha pulls.
            Please open immediately to receive it. (Random only — no selection available)
          </p>
          {guaranteeButtonVisible && (
            <button className="btn btn-success" onClick={handleGuaranteeClick}>
              Reward
            </button>
          )}
        </div>

        <div className="row flex-fill g-1 mx-3">
          {gachaData.map((item, idx) => (
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
          guaranteeCount={" [90 and 150]"}
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
      
      <ItemFooter specialCount={specialCount} itemDetails={allGears[4] || []} footerMessage={"Total Received"}/>
      
 </div> );
}
