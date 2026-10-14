import Link from "next/link";

export async function SiteHeader() {
  return (
    <header className="border-b border-orange-100 bg-white/90 px-6 py-4 shadow-sm backdrop-blur">
      <div>
        <Link
          href="/"
          className="text-2xl font-extrabold tracking-tight text-slate-900 transition-colors hover:text-orange-600"
        >
          중고거래 <span className="text-orange-500">사이트</span>
        </Link>
      </div>
    </header>
  );
}
