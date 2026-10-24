import { describe, expect, it } from "vitest";
import fixture from "../../fixtures/feedback.sample.json";

describe("foundation fixture", () => {
  it("contains the six distinct rubric criteria used by mock mode", () => {
    expect(fixture.criteria).toHaveLength(6);
    expect(new Set(fixture.criteria.map((criterion) => criterion.id)).size).toBe(6);
  });
});
