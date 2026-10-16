import Image from "next/image"
import Link from "next/link"
import { Suspense } from "react"
import { notFound } from "next/navigation"
import { connection } from "next/server"

import { SubmitButton } from "@/components/SubmitButton"
import { updateProductAction } from "@/lib/actions"
import { getProduct } from "@/lib/products"

type Props = {
  params: Promise<{ id: string }>
}

export default function EditProductPage({ params }: Props) {
  return (
    <Suspense fallback={<EditProductLoading />}>
      <EditProductContent params={params} />
    </Suspense>
  )
}

async function EditProductContent({ params }: Props) {
  const { id } = await params

  await connection()

  const product = await getProduct(id)

  if (!product) {
    notFound()
  }

  return (
    <main className="flex-1 bg-linear-to-b from-orange-50/70 via-white to-white px-6 py-12 sm:py-16">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-6 text-3xl font-extrabold tracking-tight text-slate-900">
          상품 수정
        </h1>

        <form
          action={updateProductAction.bind(null, product.id)}
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
              defaultValue={product.title}
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
              defaultValue={product.author}
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
              defaultValue={product.content}
              required
              className="resize-none rounded-xl border border-orange-100 bg-orange-50/30 px-4 py-3 text-sm text-slate-900 outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
            />
          </div>

          {product.imageUrl && (
            <div>
              <p className="mb-2 text-sm font-semibold text-slate-700">
                현재 사진
              </p>
              <Image
                src={product.imageUrl}
                alt={product.title}
                width={640}
                height={420}
                unoptimized
                className="max-h-64 w-auto rounded-xl object-contain"
              />
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label
              htmlFor="image"
              className="text-sm font-semibold text-slate-700"
            >
              새 사진 (선택)
            </label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/jpeg,image/png,image/gif,image/webp"
              className="rounded-xl border border-orange-100 bg-orange-50/30 px-4 py-3 text-sm text-slate-900"
            />
            <p className="text-xs text-slate-500">
              새 사진을 선택하지 않으면 기존 사진을 유지합니다. 최대 4MB
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="status"
              className="text-sm font-semibold text-slate-700"
            >
              거래 상태
            </label>

            <select
              id="status"
              name="status"
              defaultValue={product.status}
              className="rounded-xl border border-orange-100 bg-orange-50/30 px-4 py-3 text-sm text-slate-900"
            >
              <option value="판매중">판매중</option>
              <option value="예약중">예약중</option>
              <option value="거래완료">거래완료</option>
            </select>
          </div>
          <SubmitButton label="수정 저장" />

          <Link
            href={`/products/${product.id}`}
            className="text-center text-sm font-medium text-slate-500 transition-colors hover:text-orange-700"
          >
            취소하고 돌아가기
          </Link>
        </form>
      </div>
    </main>
  )
}

function EditProductLoading() {
  return (
    <main className="flex-1 bg-linear-to-b from-orange-50/70 via-white to-white px-6 py-12 sm:py-16">
      <div
        aria-label="상품 정보를 불러오는 중"
        className="mx-auto h-72 max-w-2xl animate-pulse rounded-3xl border border-orange-100 bg-white"
      />
    </main>
  )
}
