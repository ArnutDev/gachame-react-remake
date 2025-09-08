export default function RangerFooter({ specialCount }) {
  return (
    <>
    <footer className="mt-auto py-2 border-top bg-warning text-center">
      <p className="mb-0">ตัวพิเศษที่ได้ทั้งหมด: {specialCount}</p>
    </footer>
    </>
  );
}
