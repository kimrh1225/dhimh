# R&E Research Plan Feedback — Codex 개발 명세 패키지

> 상태: **개발 명세(앱 코드 아님)** | 기준일: 2026-10-24 | 개발 목표: 8주 안에 작동하는 연구계획 검토 웹 프로토타입 및 탐색적 비교평가

## 프로젝트 정의

영재학교 학생이 작성한 R&E 연구계획을 구조화된 평가 기준으로 검토하고, 피드백에 따라 **학생 본인이 연구계획을 수정**하며 이전 버전과 비교할 수 있는 웹 앱. AI는 연구의 타당성을 최종 판정하지 않고, 근거·한계·추가 질문·실행 가능한 개선 방향을 제시한다.

원문: [`source/original_research_plan.md`](source/original_research_plan.md). 원문의 앱 이름은 미정이므로 이 패키지는 **작업용 이름** `R&E Research Plan Feedback`을 사용한다.

## 가장 빠른 시작

1. 이 폴더를 새 Git 리포지토리의 **루트**에 복사한다. 개발 지시문과 사양 파일만 포함되어 있으며, 실행 가능한 앱 코드는 아직 없다.
2. Codex를 이 리포지토리에서 열고 [`CODEX_PROMPT.md`](CODEX_PROMPT.md)를 첫 메시지로 전달한다. `AGENTS.md`는 Codex의 지속 작업 지침이다.
3. 구현은 `codex/tasks/01-foundation.md`부터 **하나씩** 진행하고, 각 단계가 끝나면 테스트/검증 결과를 확인한다.
4. 실제 API 연동에는 사용자 본인이 서버 환경 변수 `OPENAI_API_KEY` 및 지원 모델명 `OPENAI_MODEL`을 설정한다. 비밀키를 소스·클라이언트·스크린샷·테스트 출력에 포함하지 않는다.
5. 모델 연결 없이 UI를 검증할 때는 개발 전용 `MOCK_AI=true`와 `fixtures/feedback.sample.json`을 사용하도록 구현한다.

## 문서 찾아보기

| 파일 | 역할 | 주 관리 대상 |
|---|---|---|
| [`AGENTS.md`](AGENTS.md) | Codex 안전·범위·검증 규칙 | 지속 지침 |
| [`CODEX_PROMPT.md`](CODEX_PROMPT.md) | Codex 첫 실행 지시문 | 실행 시작 |
| [`docs/PRD.md`](docs/PRD.md) | 문제·MVP 범위·완료 조건 | 제품 요구사항 |
| [`docs/USER_FLOWS.md`](docs/USER_FLOWS.md) | 사용자 여정·화면 흐름 | UX 요구사항 |
| [`docs/SCREEN_SPEC.md`](docs/SCREEN_SPEC.md) | 화면별 구성·상태·문구 | UI 구현 |
| [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) | 기술 스택·보안 경계·디렉터리 | 시스템 설계 |
| [`docs/DATA_MODEL.md`](docs/DATA_MODEL.md) | 클라이언트 로컬 저장 모델 | 데이터 모델 |
| [`docs/API_SPEC.md`](docs/API_SPEC.md) | 내부 서버 API·에러 처리 | API 계약 |
| [`docs/AI_SPEC.md`](docs/AI_SPEC.md) | 6개 평가 기준·LLM 정책 | AI 검토 동작 |
| [`schemas/feedback.schema.json`](schemas/feedback.schema.json) | 리뷰 응답 JSON Schema | 구조화된 출력의 단일 기준 |
| [`docs/EVALUATION_PLAN.md`](docs/EVALUATION_PLAN.md) | A/B/C 비교 실험 프로토콜 | 연구 평가 |
| [`docs/TEST_PLAN.md`](docs/TEST_PLAN.md) | 자동/수동 테스트·검수 | 품질 기준 |
| [`docs/IMPLEMENTATION_PLAN.md`](docs/IMPLEMENTATION_PLAN.md) | 8주 일정·우선순위·중단 기준 | 로드맵 |
| [`docs/TRACEABILITY.md`](docs/TRACEABILITY.md) | 원문→기능·실험 요구사항 추적 | 근거 관리 |
| [`docs/DECISIONS.md`](docs/DECISIONS.md) | 원문 외 설계 선택·검토 항목 | 가정 분리 |
| [`evaluation/`](evaluation/) | 비교평가 A/B 프롬프트·평정 가이드·빈 CSV 양식 | 실험 준비 |
| [`codex/tasks/`](codex/tasks/) | 8개 단계별 Codex 프롬프트 | 작업 실행 |
| [`fixtures/`](fixtures/) | 인공 예제 연구계획·피드백 | 개발·테스트용 |

## 8주 MVP의 기능 우선순위

**P0 (필수)**: 연구계획 구조화 입력, 자동 로컬 저장, 서버 경유 LLM 구조화 피드백, 6개 기준별 장점/보완/정보 부족 구분, 비판적 질문, 학생의 직접 수정, 버전 간 비교, 데이터 초기화/삭제, 안전한 에러 처리 및 검증.

**P1 (시간 허용 시)**: 텍스트/JSON 결과 내보내기, 접근성 개선, 재검토 UX, 도메인별 보충 문구, 익명 평가용 내보내기.

**제외**: 자동 연구 주제 추천, 논문 검색·RAG, 연구자 연결, 모델 미세조정, 로그인·다중 사용자 협업, AI 자동 재작성, 앱 내부 A/B/C 모델 자동 실행.

## 핵심 데모 시나리오

신규 계획 작성 → 필수 입력 확인 → 개인정보/비공개 아이디어 외부 전송 안내 및 명시적 동의 → 분석 실행 → 6개 기준 카드와 비판적 질문 확인 → 사용자가 직접 수정하여 v2 저장 → v1/v2 텍스트 차이 확인 → 이전 리뷰는 v1에 고정되어 표시 → 브라우저 로컬 데이터 삭제.

## 기술 선택 요약

`Next.js(App Router) + TypeScript + Tailwind CSS + Zod + Dexie(IndexedDB) + OpenAI Responses API + Vitest + Playwright`. 서버는 모델 호출만 처리하고 연구계획 원문을 DB에 저장하지 않는다. 실제 모델명·가격·기능 지원 여부는 구현 시 공식 문서에서 확인하도록 한다. 앱은 **로컬/통제된 데모 전제**이며, 인증·요청 제한 없이 공개 배포하지 않는다.

## 원문 충실성과 확장 구분

원문에서 직접 도출한 요구는 `docs/TRACEABILITY.md`에 연결했다. 기술 스택, 단일 사용자·브라우저 저장, 화면 구성, 6번째 평가 기준, 비교평가의 세부 절차는 **8주 MVP를 위한 설계 제안**이며 원문에 명시된 사항은 아니다. 가상 인터뷰(13문항)는 실제 수요조사의 실증 자료로 해석하지 않는다.

## 공식 구현 참고 링크

- OpenAI Structured Outputs: https://developers.openai.com/api/docs/guides/structured-outputs
- OpenAI Responses API: https://developers.openai.com/api/reference/resources/responses/methods/create
- Next.js App Router: https://nextjs.org/docs/app
- Next.js Route Handlers: https://nextjs.org/docs/app/getting-started/route-handlers
- Codex 단계별 작업 흐름 예시: https://developers.openai.com/cookbook/examples/codex/iterating-development-workflows-with-codex

위 링크는 기술 구현 참고용이며 첨부 연구계획서의 학술적 증거를 보완한 것은 아니다.
