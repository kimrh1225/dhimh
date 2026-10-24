# 데이터 모델 — 클라이언트 IndexedDB

## 1. 핵심 테이블(Dexie)

| 스토어 | 기본키 | 주요 필드 | 주요 인덱스 |
|---|---|---|---|
| `plans` | `id` (UUID) | `createdAt`, `updatedAt`, `currentVersionId`, `draft`, `draftUpdatedAt` | `updatedAt` |
| `versions` | `id` (UUID) | `planId`, `versionNumber`, `snapshot`, `createdAt` | `planId`, `[planId+versionNumber]` |
| `reviews` | `id` (UUID) | `planId`, `planVersionId`, `feedback`, `engine`, `createdAt` | `planVersionId`, `planId` |

`plans.draft`는 마지막 편집 중인 미저장 내용이며 버전 스냅샷과 분리한다. 브라우저 탭 간 동시 수정은 지원하지 않는다고 명시하고, 최소한 새로고침 복구를 제공한다.

## 2. 연구계획 스냅샷 `PlanContent`

```ts
type Domain = "math" | "physics" | "chemistry" | "biology" | "computing" | "other";
interface PlanContent {
  title: string;
  domain: Domain;
  researchQuestion: string;
  hypothesis: string;
  methods: string;
  independentVariables: string;
  dependentVariables: string;
  controls: string;
  expectedResults: string;
  resourcesAndTimeline: string;
}
interface PlanVersion {
  id: string;
  planId: string;
  versionNumber: number;
  snapshot: PlanContent;
  createdAt: string; // ISO 8601 UTC
}
```

`title`, `domain`, `researchQuestion`, `methods`만 필수. 가설이 적합하지 않은 분야와 변수가 없는 연구도 지원하기 위해 나머지는 빈 문자열 허용. `SCREEN_SPEC.md`의 길이 제한을 서버/클라이언트에서 동기화한다.

## 3. 리뷰와 불변성

`reviews.planVersionId`는 기존 버전 ID를 참조하며, 수정된 v2에 v1 평가가 '이전'하지 않는다. 리뷰 생성 후 내용 수정 불가(재분석하면 별도 review ID). 각 리뷰는 최소 다음 `engine` 메타데이터를 포함한다.

```ts
interface ReviewEngine {
  provider: "openai" | "mock";
  model: string;
  promptVersion: string;
  rubricVersion: string;
  generatedAt: string;
}
```

`feedback` 구조는 `../schemas/feedback.schema.json`을 단일 원본으로 한다. 가능하면 타입은 스키마에서 생성하거나 검사 일치 테스트를 둔다. 생성 모델이 덧붙인 `planVersionId`를 신뢰하지 말고, **서버가 요청 ID를 응답 상위 필드에 할당**한다.

## 4. 관리 규칙

- 저장/수정은 하나의 IndexedDB 트랜잭션으로 처리. `plans.currentVersionId`와 저장한 `versions.id`가 일관되어야 한다.
- 버전 번호는 `planId`별 단조 증가, 삭제한 버전 번호는 재사용하지 않는다(MVP는 개별 버전 삭제 없이 계획 전체 삭제).
- 디바이스 시간에 의존하는 날짜는 UI 표시용; 동일성은 UUID로 관리.
- 각 저장 스토어는 동일 `planId` 범위를 삭제할 때 **원자적으로** 정리한다.
- 비교는 원본 저장 불변 조건이 지켜져야 하며, 공백 정규화가 의미 있는 변화를 숨기지 않도록 원문 보존.
