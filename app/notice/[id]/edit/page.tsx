import Link from "next/link"
import { Suspense } from "react"
import { notFound } from "next/navigation"
import { connection } from "next/server"

import { SubmitButton } from "@/components/SubmitButton"
import { updateNoticeAction } from "@/lib/actions"
import { getNotice } from "@/lib/Notices"

type Props = {
  params: Promise<{ id: string }>
}

export default function EditNoticePage({ params }: Props) {
  return (
    <Suspense fallback={<EditNoticeLoading />}>
      <EditNoticeContent params={params} />
    </Suspense>
  )
}

async function EditNoticeContent({ params }: Props) {
  const { id } = await params

  await connection()

  const notice = await getNotice(id)

  if (!notice) {
    notFound()
  }

  return (
    <main className="flex-1 bg-linear-to-b from-orange-50/70 via-white to-white px-6 py-12 sm:py-16">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-6 text-3xl font-extrabold tracking-tight text-slate-900">
          공지사항 수정
        </h1>

        <form
          action={updateNoticeAction.bind(null, notice.id)}
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
              defaultValue={notice.title}
              required
              className="rounded-xl border border-orange-100 bg-orange-50/30 px-4 py-3 text-sm text-slate-900 outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
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
              defaultValue={notice.author}
              required
              className="rounded-xl border border-orange-100 bg-orange-50/30 px-4 py-3 text-sm text-slate-900 outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
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
              defaultValue={notice.content}
              required
              className="resize-none rounded-xl border border-orange-100 bg-orange-50/30 px-4 py-3 text-sm text-slate-900 outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
            />
          </div>

          <SubmitButton label="수정 저장" />

          <Link
            href={`/notice/${notice.id}`}
            className="text-center text-sm font-medium text-slate-500 transition-colors hover:text-orange-700"
          >
            취소하고 돌아가기
          </Link>
        </form>
      </div>
    </main>
  )
}

function EditNoticeLoading() {
  return (
    <main className="flex-1 bg-linear-to-b from-orange-50/70 via-white to-white px-6 py-12 sm:py-16">
      <div
        aria-label="공지사항을 불러오는 중"
        className="mx-auto h-72 max-w-2xl animate-pulse rounded-3xl border border-orange-100 bg-white"
      />
    </main>
  )
}
