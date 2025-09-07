export default function RandomModal({ slots, totalRandoms, onClose, onRandomAgain }) {
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
              {slots.map((slot, idx) => (
                <div key={idx} className="col-auto">
                  <img 
                    src={slot.image} 
                    alt={slot.name} 
                    className="img-fluid mb-1" 
                    style={{ width: "60px", height: "60px", objectFit: "cover" }}
                  />
                  <p className="mb-0">{slot.name}</p>
                </div>
              ))}
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
