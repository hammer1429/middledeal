import { Suspense } from "react";
import Link from "next/link";
import { connection } from "next/server";
import { getNotices } from "@/lib/Notices";

export default function NoticesPage() {
  return (
    <main className="flex-1 bg-linear-to-b from-orange-50/70 via-white to-white px-6 py-12 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-bold tracking-[0.18em] text-orange-600 sm:text-sm">
              WHAT&apos;S NEW
            </p>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
              공지사항
            </h1>
          </div>
          <Link
            href="/notice/new"
            className="inline-flex shrink-0 items-center rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-orange-500/20 transition hover:bg-orange-600 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
          >
            + 새 글 작성
          </Link>
        </div>
        <Suspense fallback={<NoticesLoading />}>
          <NoticesList />
        </Suspense>
        <Link
          href="/"
          className="mt-8 inline-flex text-sm font-medium text-slate-500 transition-colors hover:text-orange-700"
        >
          ← 메인으로 돌아가기
        </Link>
      </div>
    </main>
  );
}

async function NoticesList() {
  await connection();
  const notices = await getNotices();

  if (notices.length === 0) {
    return (
      <div className="rounded-2xl border border-orange-100 bg-white px-5 py-10 text-center text-sm text-slate-500 shadow-sm">
        등록된 공지사항이 없습니다.
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {notices.map((notice) => (
        <li key={notice.id}>
          <Link
            href={`/notice/${notice.id}`}
            className="group block rounded-2xl border border-orange-100 bg-white px-5 py-5 shadow-sm transition hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-md"
          >
            <p className="font-semibold text-slate-900 transition-colors group-hover:text-orange-700">
              {notice.title}
            </p>
            <p className="mt-2 text-sm text-slate-500">
              {notice.author} · {notice.createdAt}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function NoticesLoading() {
  return (
    <div aria-label="공지사항을 불러오는 중" className="flex flex-col gap-3">
      {[0, 1, 2].map((item) => (
        <div
          key={item}
          className="h-24 animate-pulse rounded-2xl border border-orange-100 bg-white"
        />
      ))}
    </div>
  );
}
