# Codex 프로젝트 지침 — R&E Research Plan Feedback

## 목표·원칙
- 목표: 학생이 작성한 R&E 연구계획을 일관된 평가 기준으로 검토하고, **학생 본인의 수정과 비교**를 돕는 8주 MVP를 구축한다.
- 권위 문서: 제품 범위는 `docs/PRD.md`, UI 동작은 `docs/USER_FLOWS.md` 및 `docs/SCREEN_SPEC.md`, API는 `docs/API_SPEC.md`, LLM 규칙은 `docs/AI_SPEC.md`, 출력 스키마는 `schemas/feedback.schema.json`, 일정은 `docs/IMPLEMENTATION_PLAN.md`다.
- 원문은 `source/original_research_plan.md`. 원문을 확장하거나 해석하는 설계 선택은 `docs/DECISIONS.md`에 적는다.

## 작업 방법
1. 새 단계에 착수할 때 해당 `codex/tasks/NN-*.md`와 연결된 문서를 읽고, **현재 저장소 상태를 먼저 점검**한다.
2. 한 번에 **선택된 단계 하나만** 구현한다. 범위를 벗어난 기능을 임의 추가하지 않는다.
3. 각 단계에서 변경 파일·결정 사항·실행한 명령·성공/실패 테스트·남은 위험을 요약한다. 테스트하지 않은 내용을 '검증됨'이라고 기록하지 않는다.
4. 검증 실패는 먼저 해결한다. 막힐 경우 원인·재현 방법·수동 우회 여부를 명시하고 정지한다.
5. 외부 배포, Git push, API 유료 호출, 의존성 대규모 변경, 개인정보 업로드는 **사용자의 별도 승인** 없이는 수행하지 않는다.
6. 문서와 코드가 충돌하면 조용히 한쪽을 버리지 말고 영향·제안 변경안을 기술한다.

## 구현 경계
- Next.js App Router, TypeScript `strict`, Tailwind, Zod, Dexie/IndexedDB, OpenAI 서버 측 SDK, Vitest, Playwright를 기본으로 한다. 설치 시 호환되는 지원 버전을 확인하고 고정한다.
- 모든 모델 API 요청은 서버 Route Handler에서 수행한다. API 키를 `NEXT_PUBLIC_*`나 프런트엔드 번들에 넣지 않는다.
- 연구계획과 리뷰는 브라우저 IndexedDB에만 영속화한다. 서버 DB·서버 파일·분석 로그에 원문을 저장하지 않는다. 브라우저 저장은 암호화/동기화되지 않으며 다른 기기에서 복구되지 않는다고 안내한다.
- API 호출 전 민감정보 및 외부 전송 사실을 설명하고 매 요청마다 명시적 동의를 얻는다. `store:false` 등 제공자 측 저장 설정은 지원·적용 가능 여부 확인 후 사용하되, 완전한 비저장을 보장하지 않는다.
- 모델 출력은 최종 연구 타당성 판정이 아니다. 근거 없는 확언·허구 논문 인용·결과 날조·학생 대신 연구계획 작성 금지.
- 모델 거절·미완료·타임아웃·키 누락·형식 오류·제약 위반을 독립적으로 처리하고 사용자가 입력한 내용은 보존한다.
- 공용 배포는 인증·레이트 리밋·남용 방지·운영 보안 검토를 완료하기 전에는 금지한다.

## 완료 조건
- 항상 `lint`, `typecheck`, 단위/통합 테스트를 돌린다(스크립트가 있는 경우). 해당 단계가 UI를 변경했다면 핵심 Playwright E2E도 실행한다.
- 최소 접근성: 키보드 탐색, 폼 레이블, 오류 안내, 포커스 표시, 색상 이외의 상태 표현.
- 모델을 호출하지 않는 테스트는 `MOCK_AI=true`와 합성 fixtures로 재현 가능해야 한다.
- 실제 응답 필드는 `schemas/feedback.schema.json`을 단일 계약으로 사용한다. JSON Schema 검증에 더해 기준 6개 유일성·정확한 텍스트 인용·최소한의 근거 적합성을 애플리케이션에서 검증한다.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
