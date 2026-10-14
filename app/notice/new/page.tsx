import { createNoticeAction } from "@/lib/actions";
import { SubmitButton } from "@/components/SubmitButton";
import Link from "next/link";

export default function NewNoticePage() {
  return (
    <main className="flex-1 bg-linear-to-b from-orange-50/70 via-white to-white px-6 py-12 sm:py-16">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-6 text-3xl font-extrabold tracking-tight text-slate-900">
          새 공지사항 작성
        </h1>
        <form
          action={createNoticeAction}
          className="flex flex-col gap-5 rounded-3xl border border-orange-100 bg-white p-6 shadow-sm sm:p-8"
        >
          <div className="flex flex-col gap-2">
            <label
              htmlFor="title"
              className="text-sm font-semibold text-slate-700"
            >
              제목
            </label>
            <input
              id="title"
              name="title"
              type="text"
              required
              className="rounded-xl border border-orange-100 bg-orange-50/30 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="author"
              className="text-sm font-semibold text-slate-700"
            >
              작성자
            </label>
            <input
              id="author"
              name="author"
              type="text"
              required
              className="rounded-xl border border-orange-100 bg-orange-50/30 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="content"
              className="text-sm font-semibold text-slate-700"
            >
              내용
            </label>
            <textarea
              id="content"
              name="content"
              rows={6}
              required
              className="resize-none rounded-xl border border-orange-100 bg-orange-50/30 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
            />
          </div>
          <SubmitButton label="등록하기" />

          <Link
            href="/notice"
            className="text-center text-sm font-medium text-slate-500 transition-colors hover:text-orange-700"
          >
            공지사항 목록으로 돌아가기
          </Link>
        </form>
      </div>
    </main>
  );
}
