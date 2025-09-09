export default function RandomModal({ slots,specials, totalRandoms, onClose, onRandomAgain }) {
  // console.log(slots)
  return (
    <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">ผลสุ่ม</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="row g-2 justify-content-center text-center">
              {slots.map((slot, idx) => {
                const isSpecial = specials[idx]; // ใช้ idx ตรวจว่า special หรือไม่
                return (
                  <div
                    key={idx}
                    className="col-3 p-1"
                    style={{
                      textAlign: "center",
                      border: isSpecial ? "2px solid green" : "none",
                      borderRadius: "4px",
                      padding: "4px",
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
            <p className="mb-0">สุ่มไปแล้ว {totalRandoms} ครั้ง</p>
            <div>
              <button type="button" className="btn btn-secondary me-2" onClick={onClose}>ปิด</button>
              <button type="button" className="btn btn-primary" onClick={onRandomAgain}>สุ่มอีกครั้ง</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
