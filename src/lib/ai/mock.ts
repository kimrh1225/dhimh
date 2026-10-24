import "server-only";
import fixture from "../../../fixtures/feedback.sample.json";
import type { ReviewAdapter } from "./adapter";

export const mockReviewAdapter: ReviewAdapter = {
  provider: "mock",
  async review() {
    return structuredClone(fixture);
  },
};
