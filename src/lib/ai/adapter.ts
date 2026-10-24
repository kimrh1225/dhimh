import "server-only";

export type ReviewInput = Readonly<Record<string, string>>;
export type ReviewFeedback = Readonly<Record<string, unknown>>;

export interface ReviewAdapter {
  readonly provider: "mock" | "openai";
  review(input: ReviewInput): Promise<ReviewFeedback>;
}
