import { expect, test } from "@playwright/test";

test("homepage loads and renders a primary heading", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/InVision Network/i);
  await expect(page.getByRole("heading", { level: 1 }).first()).toBeVisible();
});
