
export default function RangerFooter({ specialCount,rangerDetails }) {
  return (
    <footer className="mt-3 bg-dark text-center">
      <div className="container">
        <table className="table table-bordered table-sm my-0">
          <thead className="table-dark">
            <tr>
              <th colSpan={specialCount.length}>Total Received (Including ultra and common)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {rangerDetails?.map((ranger, idx) => (
                <td key={idx}>
                  <img
                    className="py-2" 
                    src={ranger.Image}
                    alt={ranger.Name}
                    style={{ width: "60px", height: "100px" }}
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
              {rangerDetails?.map((ranger, idx) => (
                <td key={idx} className="py-2">
                  {ranger.Name}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </footer>
  );
}
