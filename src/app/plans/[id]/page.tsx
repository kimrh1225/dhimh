import { EmptyState } from "@/components/EmptyState";

export default function PlanDetailPage() {
  return (
    <>
      <h1 className="mb-8 text-3xl font-bold">연구계획 상세</h1>
      <EmptyState title="표시할 계획이 없습니다" description="계획 저장과 버전 상세는 2단계, AI 검토와 피드백은 3~4단계에서 제공됩니다." action={{ href: "/plans/new", label: "새 연구계획" }} />
    </>
  );
}
