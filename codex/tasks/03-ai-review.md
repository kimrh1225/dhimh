# 단계 03 / 3주 — AI 검토 서버·스키마

**읽을 문서**: `docs/API_SPEC.md`, `docs/AI_SPEC.md`, `schemas/feedback.schema.json`, `docs/ARCHITECTURE.md`, `docs/TEST_PLAN.md`.

**Codex에게 전달할 지시**:

`POST /api/reviews`를 구현하세요. 본문 길이 제한·Zod 검증·외부 전송 동의 검사를 거쳐서만 모델 어댑터를 실행하세요. `MOCK_AI=true`면 **실제 호출 없이** `fixtures/feedback.sample.json`을 사용하세요. 실모드는 서버 전용 SDK + Responses API Strict Structured Outputs로 설계하고, 설치된 SDK가 지원하는 사용법을 공식 문서와 대조하세요. `OPENAI_MODEL`은 환경 변수로 주입하세요. JSON Schema 검증과 6개 루브릭 ID 중복/누락·인용 일치 검사를 구현하세요. 모델 거절, 미완료, 시간초과, 오류 시 API_SPEC의 일관된 오류 응답을 돌려주세요. API 키와 요청/응답 원문을 로그에 넣지 마세요. `GET /api/health`를 구현하세요.

**완료 확인**:
- mock 정상 요청 200, 기준 6개, engine.provider=mock.
- 미동의 400(모델 미호출), 초과 크기 413, 키 누락 시 503.
- 스키마/중복/인용 불일치 fixture에 대한 단위 테스트 통과.
- 실 API 유료 호출 없이 린트·타입·테스트·빌드 성공.

**금지**: 실 API 자동 실행, 서버 DB, 연구계획 자동 재작성, 비교실험 앱 기능 구현.

**보고/정지**: 테스트와 스키마 지원/호환성 검증 결과 출력 후 종료.
