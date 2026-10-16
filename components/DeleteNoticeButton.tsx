"use client"

import { deleteNoticeAction } from "@/lib/actions"

export function DeleteNoticeButton({ noticeId }: { noticeId: string }) {
  return (
    <form
      action={deleteNoticeAction.bind(null, noticeId)}
      onSubmit={(event) => {
        const confirmed = window.confirm("정말 이 공지사항을 삭제하시겠습니까?")

        if (!confirmed) {
          event.preventDefault()
        }
      }}
    >
      <button
        type="submit"
        className="rounded-xl border border-red-200 px-5 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
      >
        공지사항 삭제
      </button>
    </form>
  )
}
