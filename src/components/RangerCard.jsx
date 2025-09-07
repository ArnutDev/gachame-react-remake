export default function RangerCard({ cardInfo, onRandom }) { 
  return (
    <div className="card text-center p-2 bg-light">
      <img 
        src={cardInfo.image} 
        alt={cardInfo.title} 
        className="card-img-top mx-auto my-2" 
        style={{ width: "100px", height: "100px", objectFit: "cover" }}
      />
      <div className="card-body p-2">
        <h4 className="card-title">Gacha</h4>
        <p className="card-text">{cardInfo.info}</p>
        <button 
          className="btn btn-primary btn-sm mt-2" 
          onClick={onRandom}
        >
          Random
        </button>
      </div>
    </div>
  );
}
