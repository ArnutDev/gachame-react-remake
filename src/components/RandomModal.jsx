export default function RandomModal({ slots,specials,rubyCost, totalCount,guaranteeCount,totalRandoms, onClose, onRandomAgain }) {
  // console.log(specials[0],specials[1],specials[2],specials[3],specials[4],specials[5],specials[6]);
  return (
    <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Results</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="row g-2 justify-content-center text-center">
              {slots.map((slot, idx) => {
                const isSpecial = specials[idx]; 
                // console.log("in modal",idx, slot.Name, isSpecial);
                return (
                  <div
                    key={idx}
                    className="col-3"
                    style={{
                      textAlign: "center",
                      border: isSpecial ? "4px solid green" : "none",
                      borderRadius: "4px",
                      padding: "4px"
                    }}
                  >
                    <img
                      src={slot.Image}
                      alt={slot.Name}
                      className="img-fluid mb-1"
                      style={{ width: "80px", height: "100px", objectFit: "scale-down" }}
                    />
                    <p className="mb-0">{slot.Name}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="modal-footer d-flex justify-content-between align-items-center">
            <p className="mb-0">Ruby used: {totalCount*rubyCost} | Total count: {totalCount} | Guaranteed in: {totalRandoms}/{guaranteeCount}</p>
            <div>
              <button type="button" className="btn btn-secondary me-2" onClick={onClose}>Close</button>
              <button type="button" className="btn btn-primary" onClick={onRandomAgain}>Again</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
