// @ts-check
import { test, expect } from "@playwright/test";

test.describe("Content around the web component", () => {
  test("title", async ({ page }) => {
    await page.goto("/");

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Alpaca Map Web Component inside this page/);
  });

  test("page containing web component", async ({ page }) => {
    await page.goto("/");
    await page
      .getByText(
        "This is the external website which has content ABOVE the web component."
      )
      .isVisible();

    await page
      .getByText(
        "This is the external website which has content BELOW the web component."
      )
      .isVisible();
  });
});

test.describe("Web component within page", () => {
  test("checkboxes - defaults", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByLabel("Public farms")).toBeChecked({
      checked: true,
    });
    await expect(page.getByLabel("Private farms")).toBeChecked({
      checked: true,
    });
    await expect(page.getByLabel("Alpaca sales")).toBeChecked({
      checked: false,
    });
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

  test("header element", async ({ page }) => {
    await page.goto("/");

    await page.locator("header").isVisible();
  });

  test("footer element", async ({ page }) => {
    await page.goto("/");

    await page.locator("footer").isVisible();
  });
});
