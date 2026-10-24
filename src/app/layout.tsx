import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "R&E Research Plan Feedback",
  description: "학생의 연구계획 검토와 직접 수정을 돕는 교육용 도구",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-3 px-5 py-5">
            <Link href="/" className="font-bold text-slate-900 hover:underline">R&E Research Plan Feedback</Link>
            <nav aria-label="주 메뉴"><Link href="/plans/new" className="rounded-lg bg-blue-700 px-4 py-2 font-semibold text-white hover:bg-blue-800">새 연구계획</Link></nav>
          </div>
        </header>
        <main className="mx-auto max-w-4xl px-5 py-10">{children}</main>
        <footer className="mx-auto max-w-4xl border-t border-slate-200 px-5 py-6 text-sm text-slate-600">
          AI 피드백은 최종 연구 타당성 판정이 아닙니다. 브라우저 저장은 암호화·동기화되지 않으며 다른 기기에서 복구되지 않습니다.
        </footer>
      </body>
    </html>
  );
}
