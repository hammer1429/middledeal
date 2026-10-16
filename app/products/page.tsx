import { Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { connection } from "next/server"
import { getProducts } from "@/lib/products"

export default async function ProductsPage() {
  return (
    <main className="flex-1 bg-linear-to-b from-orange-50/70 via-white to-white px-6 py-12 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            상품 목록
          </h1>
          <Link
            href="/products/new"
            className="inline-flex shrink-0 items-center rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-orange-500/20 transition hover:bg-orange-600 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
          >
            + 새 글 작성
          </Link>
        </div>
        <Suspense fallback={<ProductsLoading />}>
          <ProductsList />
        </Suspense>
      </div>
    </main>
  )
}

async function ProductsList() {
  await connection()
  const products = await getProducts()
  return (
    <>
      <ul className="flex flex-col gap-3">
        {products.map((p) => (
          <li key={p.id}>
            <Link
              href={`/products/${p.id}`}
              className="group flex items-center gap-4 rounded-2xl border border-orange-100 bg-white px-5 py-5 shadow-sm transition hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-md"
            >
              {p.imageUrl && (
                <Image
                  src={p.imageUrl}
                  alt=""
                  width={80}
                  height={64}
                  unoptimized
                  className="h-16 w-20 shrink-0 rounded-xl object-cover"
                />
              )}
              <div>
                <p className="font-semibold text-slate-900 transition-colors group-hover:text-orange-700">
                  {p.title}
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  {p.author} · {p.createdAt}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      p.status === "판매중"
                        ? "bg-emerald-100 text-emerald-700"
                        : p.status === "예약중"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {p.status}
                  </span>

                  <span className="text-sm text-slate-500">
                    조회수 {p.views}
                  </span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <Link
        href="/"
        className="mt-8 inline-flex text-sm font-medium text-slate-500 transition-colors hover:text-orange-700"
      >
        홈으로 돌아가기
      </Link>
    </>
  )
}

function ProductsLoading() {
  return (
    <div aria-label="상품 목록을 불러오는 중" className="flex flex-col gap-3">
      {[0, 1, 2].map((item) => (
        <div
          key={item}
          className="h-24 animate-pulse rounded-2xl border border-orange-100 bg-white"
        />
      ))}
    </div>
  )
}
