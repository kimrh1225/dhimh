import { expect, test } from "@playwright/test";

test("foundation routes render accessible empty states", async ({ page }) => {
  const routes = [
    ["/", "내 연구계획"],
    ["/plans/new", "새 연구계획"],
    ["/plans/foundation-example", "연구계획 상세"],
    ["/plans/foundation-example/compare", "버전 비교"],
  ] as const;

  for (const [route, heading] of routes) {
    await page.goto(route);
    await expect(page.getByRole("heading", { name: heading, level: 1 })).toBeVisible();
    await expect(page.getByRole("main")).toBeVisible();
  }
});
