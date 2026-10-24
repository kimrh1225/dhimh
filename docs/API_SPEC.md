# 서버 API 명세 v1

> MVP는 통제된 로컬/데모 사용을 전제로 함. 인증/레이트 리밋 없이 공개 인터넷 배포 금지.

## `POST /api/reviews`

**목적**: 학생이 명시적으로 동의한 현재 연구계획 버전에 대해 6개 기준 구조화 검토를 수행. 서버에 저장하지 않고 JSON 응답만 반환.

요청 헤더: `Content-Type: application/json`

요청 본문:

```json
{
  "clientPlanVersionId": "972dd046-e764-42ed-860c-e57f8c030907",
  "consentToExternalProcessing": true,
  "plan": {
    "title": "광량과 식물 성장률의 관계",
    "domain": "biology",
    "researchQuestion": "광량이 특정 식물의 2주간 높이 증가량에 어떤 영향을 미치는가?",
    "hypothesis": "광량이 증가하면 높이 증가량도 증가할 것이다.",
    "methods": "광량이 다른 세 집단을 구성해 2주간 매일 키를 측정한다.",
    "independentVariables": "광량",
    "dependentVariables": "2주간 높이 증가량",
    "controls": "같은 품종, 같은 토양과 물 공급량",
    "expectedResults": "광량과 키 증가량의 차이를 그래프로 분석한다.",
    "resourcesAndTimeline": "2주, 동일 크기 화분 9개"
  }
}
```

- `clientPlanVersionId`: UUID 문자열, 서버는 존재 여부를 확인하지 않음(브라우저 로컬 저장만 존재).
- `consentToExternalProcessing`: `true`가 아니면 **모델 호출 없이** 400 `CONSENT_REQUIRED`.
- 필수/문자 수 제한은 `SCREEN_SPEC.md`와 동일, 객체 내 임의 키 무시하지 않고 거부.
- Body 최대 64KB; 초과 시 413 `PAYLOAD_TOO_LARGE`. 모델 요청에도 텍스트 길이를 제한하고 인젝션을 데이터로 취급.

정상 응답(200)은 다음 타입 계약을 따른다. `feedback`의 실제 전체 예시는 `../fixtures/feedback.sample.json`에서 확인할 수 있다. **`criteria`는 반드시 서로 다른 6개 항목**을 포함한다.

```ts
type ReviewResponse = {
  reviewId: string;         // 서버가 부여하는 UUID
  planVersionId: string;    // 요청의 clientPlanVersionId 그대로 반환
  engine: {
    provider: "openai" | "mock";
    model: string;
    promptVersion: string;
    rubricVersion: string;
    generatedAt: string;    // ISO 8601
  };
  feedback: ReviewFeedback; // schemas/feedback.schema.json을 만족
};
```

오류 응답(비밀 정보·원문 미포함):

```json
{
  "error": {
    "code": "AI_TIMEOUT",
    "message": "검토 요청 시간이 초과되었습니다. 잠시 후 다시 시도해 주세요.",
    "retryable": true
  }
}
```

| HTTP | 코드 | 의미 | 재시도 |
|---|---|---|---|
| 400 | `VALIDATION_ERROR` | 필수값/문자수/허용 필드 오류 | 입력 수정 |
| 400 | `CONSENT_REQUIRED` | 외부 전송 미동의 | 동의 후 재요청 |
| 413 | `PAYLOAD_TOO_LARGE` | 요청 용량 초과 | 축소 |
| 422 | `AI_REFUSAL` | 모델이 응답 거절 | 상황에 따라 |
| 503 | `AI_UNAVAILABLE` | 키 누락/모델 미설정/상위 서비스 불능 | 설정 확인 |
| 504 | `AI_TIMEOUT` | 외부 모델 응답 지연 | 예 |
| 502 | `INVALID_AI_OUTPUT` | 모델 응답 스키마·근거 검증 실패 | 예(서버 1회 교정/재시도 후) |
| 500 | `INTERNAL_ERROR` | 기타 | 예 |

서버는 본문/프롬프트/모델 응답 전문을 운영 로그에 출력하지 않는다. 호출 시간과 실패 코드 등 **비식별화된** 정보만 필요시 남긴다.

## `GET /api/health`

- 200 `{ "status": "ok", "mode": "mock" | "live" }`.
- 모델 API 실제 도달 가능 여부나 비밀키 값 노출하지 않음. 준비가 되지 않았어도 키 존재 여부를 자세히 알려 주지 말고 리뷰 요청에서 친절하게 처리.

## 내부 호출 순서

1. Body 크기 제한 → JSON 파싱 → Zod 검증 → 동의 검사.
2. `MOCK_AI`면 fixture 반환(호출/비용 없음).
3. 환경 변수 확인 → OpenAI Responses API 요청(타임아웃, 필요 시 취소).
4. `schemas/feedback.schema.json` 검증 + 정확히 6개 루브릭 ID 유일성 검증 + 인용이 실제 입력 내용의 부분 문자열인지 검증.
5. 정상 결과에 `reviewId`, `planVersionId`, `engine` 메타데이터 서버 부착 → 응답.

## 일관성 규약

- 프런트는 이전 검토 결과를 새 버전 결과로 재활용하지 않는다.
- 사용자에게 연속으로 두 번 클릭해 중복 호출하지 않도록 loading 상태 제공.
- `MOCK_AI=true`이면 테스트용 fixture만 사용하며 실험 비교평가 결과를 생성한 것으로 표기하지 않는다.
