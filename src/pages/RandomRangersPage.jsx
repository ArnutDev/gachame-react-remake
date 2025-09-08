import { useState } from "react";
import RangerCard from "../components/RangerCard";
import RandomModal from "../components/RandomModal";
import RangerFooter from "../components/RangerFooter";

// import { doRandom, calculateSpecial } from "./utils";

export default function RandomRangersPage({  slotCount = 3 }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentSlots, setCurrentSlots] = useState([]);
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
      eachRate: 0.12,
      rangerIndex1: 0,
      rangerIndex2: 1
    }
  },
  {
    cardInfo: {          // สำหรับ <RangerCard>
      title: "box2",
      image: "https://example.com/images/ranger-red.png",
      info: "xxx"
    },
    gachaConfig: {      // สำหรับ logic สุ่ม
      amount: 4,
      eachRate: 0.12,
      rangerIndex1: 0,
      rangerIndex2: 1
    }
  },
  {
    cardInfo: {          // สำหรับ <RangerCard>
      title: "box3",
      image: "https://example.com/images/ranger-red.png",
      info: "xxx"
    },
    gachaConfig: {      // สำหรับ logic สุ่ม
      amount: 4,
      eachRate: 0.12,
      rangerIndex1: 0,
      rangerIndex2: 1
    }
  }
     ,
  {
    cardInfo: {          // สำหรับ <RangerCard>
      title: "box3",
      image: "https://example.com/images/ranger-red.png",
      info: "xxx"
    },
    gachaConfig: {      // สำหรับ logic สุ่ม
      amount: 4,
      eachRate: 0.12,
      rangerIndex1: 0,
      rangerIndex2: 1
    }
  }   
        
    ]
  const handleRandom = (gachaConfig) => {
    // const slots = normalGacha(gachaConfig.amount,gachaConfig.eachRate, gachaConfig.rangerIndex1,gachaConfig.rangerIndex2);

    //del this
    const slots = data;
    //
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
          totalRandoms={totalRandoms}
          onClose={() => setModalOpen(false)}
          onRandomAgain={handleRandomAgain}
        />
      )}
      <RangerFooter specialCount={specialCount} />
      
 </div> );
}
