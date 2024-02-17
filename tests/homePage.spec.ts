import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http:localhost:3000/");
});

// TEST HEADER
test("has title", async ({ page }) => {
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/City Guide/);
});

test("get 'Nous rejoindre' link", async ({ page }) => {
  // Click the get started link.
  await page.getByRole("link", { name: "Nous rejoindre" }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.url()).toContain("/auth/register");
});

test("get 'Connexion' link", async ({ page }) => {
  // Click the get started link.
  await page.getByRole("link", { name: "Connexion" }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.url()).toContain("/auth/login");
});

test("get 'Parcourir' link", async ({ page }) => {
  // Click the get started link.
  await page.getByRole("link", { name: "Parcourir" }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.url()).toContain("/map");
});

// TEST BUTTONS
test("get 'Explorez' button", async ({ page }) => {
  // Click the get started link.
  await page.getByRole("button", { name: "Explorez" }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.url()).toContain("/map");
});

test("get 'Voir la carte' link", async ({ page }) => {
  // Click the get started link.
  await page.getByRole("link", { name: "Voir la carte" }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.url()).toContain("/map");
});

// TEST SEARCHBAR

test("get button to login when no city", async ({ page }) => {
  await page.fill("input[name=FilterSearch]", "sqdfsqdfsdf");

  await page
    .getByRole("link", { name: "Se connecter pour créer un point d'intérêt" })
    .click();

  await expect(page.url()).toContain("/auth/login");
});

// TEST CITY CARD
test("get city card", async ({ page }) => {
  await page.getByTestId("image-container").nth(0).click();

  await expect(page.url()).toContain("/poi");
});

test("go to city page and have 'Retour' button", async ({ page }) => {
  await page.getByTestId("image-container").nth(0).click();
  await page.getByRole("button", { name: "Retour" }).click();

  await expect(page.url()).toContain("/#cities");
});

test("go to city page and have heading 'Catégories' and 'Point d'intérêt'", async ({
  page,
}) => {
  await page.getByTestId("image-container").nth(0).click();

  await expect(page.getByRole("heading", { name: "Catégories" })).toBeVisible();
  await expect(page.getByRole("heading", { name: /intérêt/i })).toBeVisible();
});
