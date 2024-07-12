// @ts-check
import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Alpaca Map Web Component inside this page/);
});

test("checkboxes - check and uncheck - defaults", async ({ page }) => {
  await page.goto("/");

  await page.getByLabel("Public farms").uncheck();
  await page.getByLabel("Private farms").uncheck();
  await page.getByLabel("Alpaca sales").check();
  await page.getByLabel("Alpaca walking").check();
  await page.getByLabel("Bookable").check();
  await page.getByLabel("Shop").check();
  await page.getByLabel("Overnight stay").check();
  await page.getByLabel("Stud services").check();
});
