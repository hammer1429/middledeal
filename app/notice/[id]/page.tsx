export default function NoticeDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div>
      <h1>공지사항 상세 - {params.id}</h1>
    </div>
  );
}
