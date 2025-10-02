import changelogData from "/public/assets/json-data/change-log.json"; // ไฟล์ JSON ของคุณ
export default function Updates(){
  const sortedChangelog = [...changelogData].sort((a, b) => {
    const [dayA, monthA, yearA] = a.date.split("-");
    const [dayB, monthB, yearB] = b.date.split("-");
    const dateA = new Date(`${yearA}-${monthA}-${dayA}`);
    const dateB = new Date(`${yearB}-${monthB}-${dayB}`);
    return dateB - dateA;
  });

  return (
    
    <div className="container my-3">
    <h2 className="text-center text-light mb-4">Updates</h2>
      {sortedChangelog.map((entry) => (
        <div key={entry.version} className="update-card bg-dark mb-3 border rounded-top-4">
          <h5 className="update-head bg-dark text-white mx-3 pt-2">
            v.{entry.version} - {entry.date}
          </h5>
          <div className="update-body bg-light">
            <ul className="mb-0 py-3">
              {entry.changes.map((change, index) => (
                <li key={index} >
                    <p className="m-0">{change}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}