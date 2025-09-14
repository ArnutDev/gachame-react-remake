export default function GuaranteeModal({ guaranteeReward, onClose  }) {
  return (
    <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
        <div className="modal-dialog modal-dialog-centered modal-sm">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">ผลสุ่ม</h5>
                    <button type="button" className="btn-close" onClick={onClose}></button>
                </div>
                <div className="modal-body">
                    <div className="row g-2 justify-content-center text-center">
                        <img
                        src="https://gachame.github.io/images/rangers/u1513u-moon-thum.png"//guaranteeReward.Image
                            alt="mock up 3 normal"//guaranteeReward.Name
                            className="img-fluid mb-1"
                            style={{ width: "80px", height: "100px", objectFit: "scale-down" }}
                        />
                        <p className="mb-0">mock up 3 normal</p> {/* guaranteeReward.Name */}
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}
