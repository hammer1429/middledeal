"use client"

import { deleteProductAction } from "@/lib/actions"

export function DeleteProductButton({ productId }: { productId: string }) {
  return (
    <form
      action={deleteProductAction.bind(null, productId)}
      onSubmit={(event) => {
        const confirmed = window.confirm("정말 이 상품을 삭제하시겠습니까?")

        if (!confirmed) {
          event.preventDefault()
        }
      }}
    >
      <button
        type="submit"
        className="rounded-xl border border-red-200 px-5 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
      >
        상품 삭제
      </button>
    </form>
  )
}
