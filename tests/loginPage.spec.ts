import { test, expect } from "@playwright/test";
require("dotenv").config();

test.beforeEach(async ({ page }) => {
  await page.goto("https://staging.aimach.fr/auth/login");
});

// TEST HEADER
test("has titles", async ({ page }) => {
  await expect(page.getByText("De retour ?")).toBeVisible();
  await expect(page.getByText("Connexion")).toBeVisible();
});

test("goes to home page after connexion", async ({ page }) => {
  await page
    .getByPlaceholder("Adresse mail")
    .fill(`${process.env.TEST_ADMIN_MAIL}`);
  await page
    .getByPlaceholder("Mot de passe")
    .fill(`${process.env.TEST_ADMIN_PASSWORD}`);
  await page.getByRole("button", { name: "Explorer" }).click();
  await expect(page.getByRole("link", { name: "CITY GUIDE" })).toBeVisible();
});

test("displays message after bad connexion", async ({ page }) => {
  await page.getByPlaceholder("Adresse mail").fill("bademail@bad.fr");
  await page.getByPlaceholder("Mot de passe").fill("badpassword");
  await page.getByRole("button", { name: "Explorer" }).click();
  await expect(page.getByText("Identifiants incorrects")).toBeVisible();
});

test("goes to register page with register link", async ({ page }) => {
  await page.getByRole("link", { name: "Vous n’avez pas de compte ?" }).click();
  await expect(page.url()).toContain("/auth/register");
});
