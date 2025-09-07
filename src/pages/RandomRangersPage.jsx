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
    randomConfig: {      // สำหรับ logic สุ่ม
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
    randomConfig: {      // สำหรับ logic สุ่ม
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
    randomConfig: {      // สำหรับ logic สุ่ม
      amount: 4,
      eachRate: 0.12,
      rangerIndex1: 0,
      rangerIndex2: 1
    }
  }
        
        
    ]
  const handleRandom = (item) => {
    // const slots = doRandom(item, slotCount);

    //del this
    const slots = data;
    //
    setCurrentSlots(slots);
    setTotalRandoms(prev => prev + 1);
    //del this
    setSpecialCount(prev => prev + 1);
    //

    // setSpecialCount(prev => prev + calculateSpecial(slots));
    setCurrentCard(item);
    setModalOpen(true);
  };

  const handleRandomAgain = () => {
    if (!currentCard) return;
    setModalOpen(false);
    setTimeout(() => handleRandom(currentCard), 400);
  };

  return (
    <div>
      <h2>Ranger Page</h2>
      <div className="row">
    {data.map((item, idx) => (
      <div key={idx} className="col-12 col-md-4 mb-3">
        <RangerCard 
          cardInfo={item.cardInfo} 
          onRandom={() => handleRandom(item)} 
        />
      </div>
    ))}
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
    </div>
  );
}
