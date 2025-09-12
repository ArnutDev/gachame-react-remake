export default function ItemCard({ cardInfo, onRandom }) { 
  return (
    <div className="card text-center bg-light mx-3" style={{ minHeight: "300px" }}>
      <div className="card-img-top" style={{ height: "50%", overflow: "hidden" }}>
      <img 
        src={cardInfo.image} 
        alt={cardInfo.title} 
        className="w-100 h-100" 
        style={{objectFit: "cover" }}
      />
      </div>
      <div className="card-body d-flex flex-column justify-content-between" style={{ minHeight: "270px"}}>
        <div>
          <h4 className="card-title text-start">{cardInfo.title}</h4>
          <p className="card-text text-start">
            {cardInfo.info.split("\n").map((line, idx) => (
              <span key={idx}>
                {line}
                <br />
              </span>
            ))}
          </p>
        </div>
        <div className="d-flex justify-content-end mt-2">
          <button
            className="btn btn-primary btn-sm"
            onClick={onRandom}
          >
            Random
          </button>
        </div>
      </div>
    </div>
  );
}
