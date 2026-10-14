import { Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { connection } from "next/server"
import { getNotices } from "@/lib/Notices"
import { getProducts } from "@/lib/products"
import { DeleteProductButton } from "@/components/DeleteProductButton"

export default function Home() {
  return (
    <main className="relative flex flex-1 flex-col overflow-hidden bg-linear-to-br from-[#fffaf0] via-white to-[#ffeadb] px-6 py-12 sm:px-10 lg:py-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/4 size-96 rounded-full bg-amber-200/40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-48 right-0 size-128 rounded-full bg-orange-300/30 blur-3xl"
      />
      <section className="relative mx-auto grid min-h-[36rem] w-full max-w-6xl items-center gap-14 py-8 lg:grid-cols-[1fr_0.9fr] lg:gap-8">
        <div className="relative z-10 text-center lg:text-left">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-200/80 bg-white/70 px-4 py-2 text-xs font-bold tracking-[0.18em] text-orange-700 shadow-sm sm:text-sm">
            <span className="size-2 rounded-full bg-orange-500 shadow-[0_0_12px_2px_rgba(249,115,22,0.5)]" />
            FIND YOUR NEXT FAVORITE
          </p>
          <h1 className="text-5xl font-black leading-[1.08] tracking-tight text-slate-950 sm:text-7xl lg:text-8xl">
            중고거래
            <br />
            <span className="bg-linear-to-r from-orange-500 via-orange-600 to-rose-500 bg-clip-text text-transparent">
              사이트
            </span>
          </h1>
          <p className="mx-auto mt-7 max-w-md text-base leading-7 text-slate-600 sm:text-lg lg:mx-0">
            좋은 물건이 새로운 주인을 만나는 곳.
            <br className="hidden sm:block" />
            당신의 다음 발견을 시작해보세요.
          </p>
          <Link
            href="/login"
            className="group mt-9 inline-flex items-center gap-4 rounded-full bg-slate-950 py-4 pl-7 pr-5 font-semibold text-white shadow-xl shadow-slate-950/20 transition duration-200 hover:-translate-y-1 hover:bg-orange-600 hover:shadow-orange-600/25 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-600"
          >
            로그인 페이지로 이동
            <span className="flex size-9 items-center justify-center rounded-full bg-white/15 text-lg transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

        <div
          aria-hidden="true"
          className="relative mx-auto flex aspect-square w-full max-w-md items-center justify-center"
        >
          <div className="absolute inset-[8%] rounded-full border border-orange-300/40" />
          <div className="absolute inset-[17%] rounded-full border border-dashed border-orange-300/50" />
          <div className="absolute inset-[24%] rounded-full bg-linear-to-br from-amber-300 via-orange-400 to-rose-500 shadow-2xl shadow-orange-500/30" />
          <div className="absolute right-[8%] top-[13%] size-7 rounded-full bg-yellow-300 shadow-lg shadow-yellow-500/40" />
          <div className="absolute bottom-[13%] left-[9%] size-4 rounded-full bg-rose-400 shadow-lg shadow-rose-500/40" />

          <div className="absolute left-[2%] top-[23%] w-44 rotate-[-8deg] rounded-2xl border border-white/80 bg-white/85 p-4 shadow-xl shadow-orange-950/10 backdrop-blur-sm transition-transform duration-500 hover:-rotate-3 sm:left-[5%]">
            <div className="flex items-center gap-3">
              <div className="flex size-12 items-center justify-center rounded-xl bg-linear-to-br from-sky-100 to-blue-200">
                <span className="size-6 rounded-md border-2 border-blue-500/70" />
              </div>
              <div className="space-y-2">
                <div className="h-2 w-16 rounded-full bg-slate-800/80" />
                <div className="h-1.5 w-10 rounded-full bg-slate-300" />
              </div>
            </div>
          </div>

          <div className="absolute bottom-[19%] right-[0%] w-48 rotate-[7deg] rounded-2xl border border-white/80 bg-white/90 p-4 shadow-xl shadow-orange-950/10 backdrop-blur-sm transition-transform duration-500 hover:rotate-2 sm:right-[3%]">
            <div className="flex items-center gap-3">
              <div className="flex size-12 items-center justify-center rounded-xl bg-linear-to-br from-emerald-100 to-lime-200">
                <span className="size-6 rounded-full border-2 border-emerald-600/70" />
              </div>
              <div className="space-y-2">
                <div className="h-2 w-20 rounded-full bg-slate-800/80" />
                <div className="h-1.5 w-12 rounded-full bg-slate-300" />
              </div>
            </div>
          </div>

          <div className="absolute right-[16%] top-[16%] flex size-14 rotate-12 items-center justify-center rounded-2xl bg-slate-950 text-2xl text-white shadow-xl shadow-slate-950/20">
            ✳
          </div>
          <div className="absolute bottom-[12%] left-[24%] flex size-12 -rotate-12 items-center justify-center rounded-full border-4 border-white bg-orange-500 text-xl text-white shadow-lg">
            +
          </div>
        </div>
      </section>

      <section
        aria-labelledby="home-notices-heading"
        className="relative mx-auto w-full max-w-6xl border-t border-orange-200/70 py-12 sm:py-16"
      >
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-bold tracking-[0.18em] text-orange-600 sm:text-sm">
              WHAT&apos;S NEW
            </p>
            <h2
              id="home-notices-heading"
              className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl"
            >
              공지사항
            </h2>
          </div>
          <Link
            href="/notice"
            className="shrink-0 text-sm font-semibold text-orange-700 transition-colors hover:text-orange-800"
          >
            전체 보기 <span aria-hidden="true">→</span>
          </Link>
        </div>
        <Suspense fallback={<HomeNoticesLoading />}>
          <HomeNotices />
        </Suspense>
      </section>

      <section
        aria-labelledby="home-products-heading"
        className="relative mx-auto w-full max-w-6xl border-t border-orange-200/70 py-12 sm:py-16"
      >
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-bold tracking-[0.18em] text-orange-600 sm:text-sm">
              JUST LISTED
            </p>
            <h2
              id="home-products-heading"
              className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl"
            >
              새로 등록된 상품
            </h2>
          </div>
          <Link
            href="/products"
            className="shrink-0 text-sm font-semibold text-orange-700 transition-colors hover:text-orange-800"
          >
            전체 보기 <span aria-hidden="true">→</span>
          </Link>
        </div>
        <Suspense fallback={<HomeProductsLoading />}>
          <HomeProducts />
        </Suspense>
      </section>
    </main>
  )
}

async function HomeProducts() {
  await connection()
  const products = (await getProducts()).slice(0, 3)

  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-orange-100 bg-white/80 px-5 py-8 text-center text-sm text-slate-500 shadow-sm">
        등록된 상품이 없습니다.
      </div>
    )
  }

  return (
    <ul className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
      {products.map((product) => (
        <li key={product.id}>
          <Link
            href={`/products/${product.id}`}
            className="group flex h-full flex-col overflow-hidden rounded-2xl border border-orange-100 bg-white/85 shadow-sm transition hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-md"
          >
            {product.imageUrl ? (
              <Image
                src={product.imageUrl}
                alt=""
                width={640}
                height={420}
                unoptimized
                className="h-48 w-full object-cover"
              />
            ) : (
              <div
                aria-hidden="true"
                className="flex h-48 items-center justify-center bg-linear-to-br from-amber-100 via-orange-100 to-rose-100 text-4xl text-orange-400"
              >
                ✳
              </div>
            )}
            <div className="flex flex-1 flex-col justify-between gap-4 p-5">
              <p className="line-clamp-2 font-semibold text-slate-900 transition-colors group-hover:text-orange-700">
                {product.title}
              </p>
              <p className="text-sm text-slate-500">
                {product.author} · {product.createdAt}
              </p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}

function HomeProductsLoading() {
  return (
    <div
      aria-label="상품을 불러오는 중"
      className="grid gap-3 sm:grid-cols-2 md:grid-cols-3"
    >
      {[0, 1, 2].map((item) => (
        <div
          key={item}
          className="h-72 animate-pulse rounded-2xl border border-orange-100 bg-white/85"
        />
      ))}
    </div>
  )
}

async function HomeNotices() {
  await connection()
  const notices = (await getNotices()).slice(0, 3)

  if (notices.length === 0) {
    return (
      <div className="rounded-2xl border border-orange-100 bg-white/80 px-5 py-8 text-center text-sm text-slate-500 shadow-sm">
        등록된 공지사항이 없습니다.
      </div>
    )
  }

  return (
    <ul className="grid gap-3 md:grid-cols-3">
      {notices.map((notice) => (
        <li key={notice.id}>
          <Link
            href={`/notice/${notice.id}`}
            className="group flex h-full flex-col justify-between gap-5 rounded-2xl border border-orange-100 bg-white/85 p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-md"
          >
            <p className="line-clamp-2 font-semibold text-slate-900 transition-colors group-hover:text-orange-700">
              {notice.title}
            </p>
            <p className="text-sm text-slate-500">
              {notice.author} · {notice.createdAt}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  )
}

function HomeNoticesLoading() {
  return (
    <div
      aria-label="공지사항을 불러오는 중"
      className="grid gap-3 md:grid-cols-3"
    >
      {[0, 1, 2].map((item) => (
        <div
          key={item}
          className="h-28 animate-pulse rounded-2xl border border-orange-100 bg-white/85"
        />
      ))}
    </div>
  )
}
