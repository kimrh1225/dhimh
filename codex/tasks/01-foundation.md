# 단계 01 / 1주 — 리포지토리 기반

**읽을 문서**: `AGENTS.md`, `docs/PRD.md`, `docs/ARCHITECTURE.md`, `docs/TEST_PLAN.md`.

**Codex에게 전달할 지시**:

현재 리포지토리 상태를 확인하고, 기존 사양 Markdown/fixtures를 유지한 채 Next.js App Router + TypeScript strict + Tailwind 기반을 초기화해 주세요. `src/` 구조는 ARCHITECTURE를 따르되 중복 코드를 만들지 마세요. 홈/계획 생성/상세/비교 화면의 접근 가능한 기본 라우트 및 공통 레이아웃을 만드세요. 서버 전용 `MOCK_AI` 어댑터 인터페이스를 먼저 마련하되 **실제 API를 호출하지 마세요**. 코드에는 lint, typecheck, test(Vitest), test:e2e(Playwright), build 스크립트와 `.env.example`(키 값 빈 문자열), `.gitignore`(.env.local 등)를 포함하세요. 명세 파일들을 임의로 재작성하지 마세요.

**완료 확인**:
- npm install이 가능한 잠금 파일 존재. 실제 버전 호환성 확인.
- `npm run lint`, `npm run typecheck`, `npm run test`, `npm run build` 성공.
- 핵심 라우트가 404 없이 렌더, UI에 개발용 빈 상태 표시.
- `.env.local`과 비밀값이 Git 추적 대상으로 포함되지 않음.

**금지**: 실제 LLM 호출, 원격 push, 배포, 인증·서버 DB 추가, 2단계 입력/저장 전체 구현.

**보고**: 변경 파일, 실제 검사 로그 요약, 설정이 필요한 환경, 다음 카드 전 미해결 사안. 여기서 정지.
