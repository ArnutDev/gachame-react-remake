export default function RangerFooter({ specialCount }) {
  return (
    <footer className="mt-auto py-2 border-top bg-warning text-center">
      <div className="container">
        <table className="table table-bordered table-sm mb-0">
          <thead className="table-dark">
            <tr>
              
              <th colSpan={specialCount.length + 1}>สถิต</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>xxx</td>
              {specialCount.map((count, idx) => (<td key={idx}>{count}</td>))}

            </tr>
          </tbody>
        </table>
      </div>
    </footer>
  );
}
