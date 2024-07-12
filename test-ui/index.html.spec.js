// @ts-check
import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Alpaca Map Web Component inside this page/);
});

test("checkboxes - defaults", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByLabel("Public farms")).toBeChecked({ checked: true });
  await expect(page.getByLabel("Private farms")).toBeChecked({ checked: true });
  await expect(page.getByLabel("Alpaca sales")).toBeChecked({ checked: false });
  await expect(page.getByLabel("Alpaca walking")).toBeChecked({
    checked: false,
  });
  await expect(page.getByLabel("Bookable")).toBeChecked({
    checked: false,
  });
  await expect(page.getByLabel("Shop")).toBeChecked({
    checked: false,
  });
  await expect(page.getByLabel("Overnight stay")).toBeChecked({
    checked: false,
  });
  await expect(page.getByLabel("Stud services")).toBeChecked({
    checked: false,
  });
});

test("has header", async ({ page }) => {
  await page.goto("/");

  await page.locator("header").isVisible();
});
