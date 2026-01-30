import { useState, useEffect } from "react";
import ItemCard from "../components/ItemCard";
import RandomModal from "../components/RandomModal";
import ItemFooter from "../components/ItemFooter.jsx";
import rangersGacha from "../js/randomRangers.js";
import GuaranteeModal from "../components/GuaranteeModal.jsx";
import { getGuaranteedReward } from "../js/utils.js";
import { getRangersGachaData, getRangersGachaPath } from "../js/gachaData.js";

export default function RandomRangersPage() {
  const [allRangers, setAllRangers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentSlots, setCurrentSlots] = useState([]);
  const [currentSpecials, setCurrentSpecials] = useState([]);
  const [totalRandoms, setTotalRandoms] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [guaranteeButtonVisible, setGuaranteeButtonVisible] = useState(false);
  const [guaranteeModelOpen, setGuaranteeModelOpen] = useState(false);
  const [guaranteeReward, setguaranteeReward] = useState(null);
  // const [specialCount, setSpecialCount] = useState([0,0,0]);//even
  const [specialCount, setSpecialCount] = useState([0, 0, 0, 0]); //odd
  const [currentCard, setCurrentCard] = useState(null);
  const [gachaData, setGachaData] = useState([]);

  useEffect(() => {
    const data = getRangersGachaData();
    setGachaData(data);
    const rangersPaths = getRangersGachaPath();
    async function loadAllFiles() {
      const promises = rangersPaths.map((path) =>
        fetch(path).then((res) => res.json()),
      );
      const dataArray = await Promise.all(promises);
      setAllRangers(dataArray);
    }

    loadAllFiles();
  }, []);

  const handleRandom = async (gachaConfig) => {
    const [slots, specials, specialsCountArray] = await rangersGacha(
      allRangers,
      gachaConfig,
    );
    // console.log("after return specials", specials);
    setCurrentSpecials(specials);

    setCurrentSlots(slots);
    setSpecialCount(specialsCountArray);

    // setSpecialCount(prev => prev + calculateSpecial(slots));
    setCurrentCard(gachaConfig);
    setModalOpen(true);
    setTotalCount((prev) => prev + 1);
    setTotalRandoms((prev) => {
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
    setTimeout(() => handleRandom(currentCard), 500);
  };

  const handleGuaranteeClick = () => {
    // console.log("กดปุ่มการันตีแล้ว");
    const [guaranteeResult, specialsCountArray] = getGuaranteedReward(
      "ranger",
      allRangers[4],
    );
    setSpecialCount(specialsCountArray);
    setguaranteeReward(guaranteeResult);
    setGuaranteeModelOpen(true);
    setGuaranteeButtonVisible(false); // ซ่อนปุ่มหลังกด
  };
  return (
    <div className="d-flex flex-column" style={{ minHeight: "auto" }}>
      <div className="flex-grow-1">
        <h2 className="my-3 text-center text-light">
          Gacha Rangers For February
        </h2>
        <div className="my-3 text-warning text-center">
          <p>
            Notice: You will receive a guaranteed box here every 100 gacha
            pulls. Please open immediately to receive it. (Random only — no
            selection available)
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
          rubyCost={300}
          guaranteeCount={100}
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

      <ItemFooter
        specialCount={specialCount}
        itemDetails={allRangers[4] || []}
        footerMessage={"Total Received (including ultra and common)"}
      />
    </div>
  );
}
