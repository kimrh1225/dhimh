import { EmptyState } from "@/components/EmptyState";

export default function NewPlanPage() {
  return (
    <>
      <h1 className="mb-8 text-3xl font-bold">새 연구계획</h1>
      <EmptyState title="입력 화면 준비 중" description="연구계획 입력, 필드 검증과 이 브라우저에만 저장하는 기능은 2단계에서 제공됩니다." action={{ href: "/", label: "홈으로" }} />
    </>
  );
}
