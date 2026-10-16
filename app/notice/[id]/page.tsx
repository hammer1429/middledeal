import { Suspense } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { connection } from "next/server";
import { getNotice } from "@/lib/Notices";
import { DeleteNoticeButton } from "@/components/DeleteNoticeButton";

type Props = { params: Promise<{ id: string }> };

export default function NoticeDetailPage({ params }: Props) {
  return (
    <main className="flex-1 bg-linear-to-b from-orange-50/70 via-white to-white px-6 py-12 sm:py-16">
      <Suspense fallback={<NoticeLoading />}>
        <NoticeDetail params={params} />
      </Suspense>
    </main>
  );
}

async function NoticeDetail({ params }: Props) {
  const { id } = await params;
  await connection();
  const notice = await getNotice(id);

  if (!notice) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl rounded-3xl border border-orange-100 bg-white p-6 shadow-sm sm:p-10">
      <Link
        href="/notice"
        className="inline-flex text-sm font-medium text-slate-500 transition-colors hover:text-orange-700"
      >
        ← 공지사항 목록
      </Link>
      <h1 className="mt-8 text-3xl font-extrabold tracking-tight text-slate-900">
        {notice.title}
      </h1>
      <p className="mt-3 border-b border-orange-100 pb-6 text-sm text-slate-500">
        {notice.author} · {notice.createdAt}
      </p>
      <p className="whitespace-pre-wrap py-8 leading-8 text-slate-700">
        {notice.content}
      </p>
      <div className="mt-8 flex flex-wrap gap-3 border-t border-orange-100 pt-6">
        <Link
          href={`/notice/${notice.id}/edit`}
          className="rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
        >
          공지사항 수정
        </Link>

        <DeleteNoticeButton noticeId={notice.id} />
      </div>
    </article>
  );
}

function NoticeLoading() {
  return (
    <div
      aria-label="공지사항을 불러오는 중"
      className="mx-auto h-72 max-w-3xl animate-pulse rounded-3xl border border-orange-100 bg-white"
    />
  );
}
