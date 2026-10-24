import { EmptyState } from "@/components/EmptyState";

export default function ComparePage() {
  return (
    <>
      <h1 className="mb-8 text-3xl font-bold">버전 비교</h1>
      <EmptyState title="비교할 버전이 없습니다" description="수정 버전을 저장한 뒤 비교할 수 있습니다. 버전 비교 기능은 5단계에서 제공됩니다." action={{ href: "/", label: "홈으로" }} />
    </>
  );
}
