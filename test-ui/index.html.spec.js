import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  // ARRANGE
  await page.goto("/");
});

test.describe("Content around the web component", () => {
  test("title", async ({ page }) => {
    // ASSERT
    await expect(page).toHaveTitle(/Alpaca Map Web Component inside this page/);
  });

  test("page containing web component", async ({ page }) => {
    // ASSERT
    await page
      .getByText(
        "This is the external website which has content ABOVE the web component."
      )
      .isVisible();
  });
});

test.describe("Web component within page", () => {
  test("checkboxes - defaults", async ({ page }) => {
    // ASSERT
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
    // ASSERT
    await page.locator("header").isVisible();
  });

  test("footer element", async ({ page }) => {
    // ASSERT
    await page.locator("footer").isVisible();

    const logo = page.getByAltText("Alpaca Life logo");
    await expect(logo).toBeVisible();

    const linkLogo = page.getByTestId("link-logo");
    await expect(linkLogo).toHaveAttribute("href", "https://www.alpaca.life");

    const linkWebPage = page.getByRole("link", { name: "www.alpaca.life" });
    await expect(linkWebPage).toHaveAttribute(
      "href",
      "https://www.alpaca.life"
    );
    await expect(linkWebPage).toBeVisible();

    const logoSupport = page.getByAltText("Buy me a ko-fi");
    await expect(logoSupport).toBeVisible();

    const linkLogoSupport = page.getByTestId("link-support");
    await expect(linkLogoSupport).toHaveAttribute(
      "href",
      "https://ko-fi.com/anitalipsky"
    );

    await page
      .getByText(
        "This is the external website which has content BELOW the web component."
      )
      .isVisible();
  });
});
