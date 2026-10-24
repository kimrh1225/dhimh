import { EmptyState } from "@/components/EmptyState";

export default function HomePage() {
  return (
    <>
      <h1 className="mb-3 text-3xl font-bold">내 연구계획</h1>
      <p className="mb-8 text-slate-700">학생이 직접 계획을 쓰고 수정하며, AI의 질문을 검토할 수 있습니다.</p>
      <EmptyState title="저장된 연구계획이 없습니다" description="개발용 빈 상태입니다. 계획 입력과 브라우저 저장은 2단계에서 제공됩니다." action={{ href: "/plans/new", label: "새 연구계획 작성" }} />
    </>
  );
}
