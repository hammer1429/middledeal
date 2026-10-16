import { Suspense } from "react"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { connection } from "next/server"
import { incrementProductViews } from "@/lib/products"
import { DeleteProductButton } from "@/components/DeleteProductButton"

type Props = { params: Promise<{ id: string }> }

export default function ProductDetailPage({ params }: Props) {
  return (
    <main className="flex-1 bg-linear-to-b from-orange-50/70 via-white to-white px-6 py-12 sm:py-16">
      <Suspense fallback={<ProductLoading />}>
        <ProductDetail params={params} />
      </Suspense>
    </main>
  )
}

async function ProductDetail({ params }: Props) {
  const { id } = await params
  await connection()
  const product = await incrementProductViews(id)

  if (!product) {
    notFound()
  }

  if (!product) {
    notFound()
  }

  return (
    <article className="mx-auto max-w-3xl rounded-3xl border border-orange-100 bg-white p-6 shadow-sm sm:p-10">
      <Link
        href="/products"
        className="inline-flex text-sm font-medium text-slate-500 transition-colors hover:text-orange-700"
      >
        ← 목록으로
      </Link>
      <h1 className="mt-8 text-3xl font-extrabold tracking-tight text-slate-900">
        {product.title}
      </h1>
      <p className="mt-3 border-b border-orange-100 pb-6 text-sm text-slate-500">
        {product.author} · {product.createdAt}
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-700">
          {product.status}
        </span>

        <span className="text-sm text-slate-500">조회수 {product.views}</span>
      </div>
      {product.imageUrl && (
        <Image
          src={product.imageUrl}
          alt={product.title}
          width={960}
          height={640}
          unoptimized
          className="mt-6 max-h-[32rem] w-full rounded-2xl object-contain"
        />
      )}
      <p className="whitespace-pre-wrap py-8 leading-8 text-slate-700">
        {product.content}
      </p>

      <div className="mt-8 flex flex-wrap gap-3 border-t border-orange-100 pt-6">
        <Link
          href={`/products/${product.id}/edit`}
          className="rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
        >
          상품 수정
        </Link>

        <DeleteProductButton productId={product.id} />
      </div>
    </article>
  )
}

function ProductLoading() {
  return (
    <div
      aria-label="상품 정보를 불러오는 중"
      className="mx-auto h-72 max-w-3xl animate-pulse rounded-3xl border border-orange-100 bg-white"
    />
  )
}
