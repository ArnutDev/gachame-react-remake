export default function ItemFooter({ specialCount, itemDetails, footerMessage }) {
  return (
    <footer className="mt-3 bg-dark text-center">
      <div className="container">
        <table className="table table-bordered table-sm my-0 text-center" style={{ tableLayout: "fixed", width: "100%" }}>
          <thead className="table-dark">
            <tr>
              <th colSpan={specialCount.length}>{footerMessage}</th>
            </tr>
          </thead>

          <tbody>
            {/* แถวภาพ */}
            <tr>
              {itemDetails?.map((item, idx) => (
                <td key={idx} className="align-middle">
                  <img
                    src={item.Image}
                    alt={item.Name}
                    className="img-fluid mx-auto d-block object-fit-contain py-2"
                    style={{ maxHeight: "80px" }}
                  />
                </td>
              ))}
            </tr>

            {/* แถวจำนวน */}
            <tr>
              {specialCount.map((count, idx) => (
                <td key={idx} className="py-2 align-middle">
                  {count}
                </td>
              ))}
            </tr>

            {/* แถวชื่อ */}
            <tr>
              {itemDetails?.map((item, idx) => (
                <td key={idx} className="py-2 align-middle">
                  {item.Name}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </footer>
  );
}
