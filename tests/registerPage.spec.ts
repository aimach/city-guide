import { test, expect } from "@playwright/test";
require("dotenv").config();

test.beforeEach(async ({ page }) => {
  await page.goto("https://staging.aimach.fr/auth/register");
});

// TEST HEADER
test("has titles", async ({ page }) => {
  await expect(page.getByText("Nous rejoindre")).toBeVisible();
  await expect(page.getByText("Inscription")).toBeVisible();
});

test("diplays error messages when register with empty input", async ({
  page,
}) => {
  await page.getByPlaceholder("Adresse mail").fill("");
  await page.getByPlaceholder("Nom d'utilisateur").fill("");
  await page.getByPlaceholder("Mot de passe").fill("");
  await page.getByRole("button", { name: "Explorer" }).click();
  await expect(
    page.getByText("Vous devez renseigner ce champ").first()
  ).toBeVisible();
  await expect(
    page.getByText("Vous devez renseigner ce champ").nth(1)
  ).toBeVisible();
  await expect(
    page.getByText("Vous devez renseigner ce champ").nth(2)
  ).toBeVisible();
});

test("displays error message when register with bad email", async ({
  page,
}) => {
  await page.getByPlaceholder("Adresse mail").fill("bademail");
  await page.getByPlaceholder("Nom d'utilisateur").fill("playwright");
  await page.getByPlaceholder("Mot de passe").fill(`Playwright!2024`);
  await page.getByRole("button", { name: "Explorer" }).click();
  await expect(page.getByText("Cet email est invalide")).toBeVisible();
});

test("displays error message when register with bad username", async ({
  page,
}) => {
  await page.getByPlaceholder("Adresse mail").fill(`playwright@test.fr`);
  await page.getByPlaceholder("Nom d'utilisateur").fill("playwright?§");
  await page.getByPlaceholder("Mot de passe").fill(`Playwright!2024`);
  await page.getByRole("button", { name: "Explorer" }).click();
  await expect(
    page.getByText(
      "Le nom d'utilisateur doit contenir entre 3 et 20 caractères sans symboles"
    )
  ).toBeVisible();
});

test("displays error message when register with bad password", async ({
  page,
}) => {
  await page.getByPlaceholder("Adresse mail").fill(`playwright@test.fr`);
  await page.getByPlaceholder("Nom d'utilisateur").fill("playwright");
  await page.getByPlaceholder("Mot de passe").fill(`playwrigth`);
  await page.getByRole("button", { name: "Explorer" }).click();
  await expect(
    page.getByText(
      "Le mot de passe doit contenir au moins 8 caractères, 1 chiffre, une majuscule et 1 symbole"
    )
  ).toBeVisible();
});

test("goes to home when register with good credentials", async ({ page }) => {
  await page.getByPlaceholder("Adresse mail").fill(`playwright@test.fr`);
  await page.getByPlaceholder("Nom d'utilisateur").fill("playwrigth");
  await page.getByPlaceholder("Mot de passe").fill(`Playwright!2024`);
  await page.getByRole("button", { name: "Explorer" }).click();
  await expect(page.getByRole("link", { name: "CITY GUIDE" })).toBeVisible();
});

test("goes to login page with login link", async ({ page }) => {
  await page.getByRole("link", { name: "Vous avez déjà un compte ?" }).click();
  await expect(page.url()).toContain("/auth/login");
});
