
export default function ItemFooter({ specialCount,itemDetails,footerMessage }) {
  return (
    <footer className="mt-3 bg-dark text-center">
      <div className="container">
        <table className="table table-bordered table-sm my-0">
          <thead className="table-dark">
            <tr>
              <th colSpan={specialCount.length}>{footerMessage}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {itemDetails?.map((item, idx) => (
                <td key={idx}>
                  <img
                    className="py-2" 
                    src={item.Image}
                    alt={item.Name}
                    style={{ width: "55px", height: "100px" }}
                  />
                </td>
              ))}
            </tr>
            <tr>
              {specialCount.map((count, idx) => (
                <td key={idx} className="py-2">{count}</td>
              ))}
            </tr>
            <tr>
              {itemDetails?.map((item, idx) => (
                <td key={idx} className="py-2">
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
