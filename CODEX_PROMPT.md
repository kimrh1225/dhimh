# Codex 첫 실행 프롬프트

아래 내용을 Codex의 **첫 메시지**로 전달한다.

---

당신은 8주 안에 교육용 R&E 연구계획 피드백 웹 앱을 구현할 시니어 풀스택 엔지니어다. 이 리포지토리는 코드가 아닌 개발 명세 패키지에서 시작한다.

먼저 `AGENTS.md`, `README.md`, `docs/PRD.md`, `docs/ARCHITECTURE.md`, `docs/AI_SPEC.md`, `docs/IMPLEMENTATION_PLAN.md`, `docs/DECISIONS.md`, `schemas/feedback.schema.json`, `codex/tasks/01-foundation.md`를 읽는다.

핵심 목표:
1. 학생이 연구 주제·연구 질문·가설·연구 방법·변수·통제·예상 결과·자원 및 일정 제약을 입력한다.
2. 서버가 평가 기준 6개에 따라 구조화된 AI 피드백을 생성하고, 결과의 근거·한계·비판적 질문을 보여준다.
3. 학생이 연구계획을 **직접** 수정하고 이전 버전과 차이를 비교한다. AI가 연구계획을 대신 작성하거나 최종 판정을 하지 않는다.
4. 입력 및 피드백은 기본적으로 브라우저 IndexedDB에만 저장한다. 서버는 API 호출용이며 원문을 영구 저장하지 않는다.
5. 앱 내에서 일반 ChatGPT와의 비교를 자동화하지 않는다. 해당 비교평가는 `docs/EVALUATION_PLAN.md`의 오프라인 절차로 진행한다.

**현재는 반드시 1단계 `codex/tasks/01-foundation.md`만 수행한다.** 먼저 생성/수정할 파일과 검증 명령의 간단한 계획을 제시한 후 진행한다. 공식 자료에서 라이브러리 버전과 OpenAI SDK 메서드 호환성을 확인하되, 모델명은 환경 변수 `OPENAI_MODEL`로 주입한다. UI/테스트는 실제 API 키 없이 `MOCK_AI=true`로 작동해야 한다.

작업 완료 후 다음을 출력한다.
- 생성 및 수정 파일 목록
- 실행한 검사와 실제 결과(실행하지 못한 검사도 구분)
- 구현되지 않은 다음 단계 작업 및 이슈
- 사용자 승인 없이 수행하지 않은 유료 API 호출·배포·Git push 여부

스코프를 벗어나거나 문서가 모호하면, 변경을 임의 확장하기 전에 `docs/DECISIONS.md`에 검토 항목을 남긴다. 한 단계가 끝나면 다음 단계로 자동 진행하지 않는다.

---

이후에는 다음 단계를 하나씩 지정한다: `codex/tasks/02-input-persistence.md` → `03-ai-review.md` → `04-feedback-ui.md` → `05-revision-compare.md` → `06-hardening.md` → `07-evaluation.md` → `08-final-demo.md`.
