import { expect } from "@playwright/test";
import { createBdd } from "playwright-bdd";

const { Given, When, Then } = createBdd();

Given("User navigates to page", async ({ page }) => {
  await page.goto("http://localhost:5173/login");
});

When("User logs in", async ({ page }) => {
  await page.getByRole("textbox", { name: "Username" }).click();
  await page.getByRole("textbox", { name: "Username" }).fill("admin");
  await page.getByRole("textbox", { name: "Email" }).click();
  await page.getByRole("textbox", { name: "Email" }).fill("admin@admin.com");
  await page.getByRole("button", { name: "Login" }).click();
});

Then("It should show Landing Page", async ({ page }) => {
  await expect(
    page.getByRole("heading", { name: "From Unit to E2Es — A Testing" })
  ).toBeVisible();
});
