import { test, expect } from "@playwright/test";

test.skip("test", async ({ page }) => {
  await page.goto("http://localhost:5173/login");
  await page.getByRole("textbox", { name: "Username" }).click();
  await page.getByRole("textbox", { name: "Username" }).fill("admin");
  await page.getByRole("textbox", { name: "Email" }).click();
  await page.getByRole("textbox", { name: "Email" }).fill("admin@admin.com");
  await page.getByRole("button", { name: "Login" }).click();

  await expect(
    page.getByRole("heading", { name: "From Unit to E2Es — A Testing" })
  ).toBeVisible();

  await page.getByRole("button", { name: "My Cars" }).click();
  await expect(
    page.getByRole("heading", { name: "No cars to display..." })
  ).toBeVisible();

  await page.getByRole("button", { name: "Add Cars" }).click();
  await page.getByRole("combobox", { name: "Segment" }).click();
  await page.getByRole("option", { name: "Van" }).click();
  await page.getByRole("textbox", { name: "Model" }).click();
  await page.getByRole("textbox", { name: "Model" }).fill("Car");
  await page.getByRole("textbox", { name: "Brand" }).click();
  await page.getByRole("textbox", { name: "Brand" }).fill("Brand");
  await page.getByRole("textbox", { name: "Fuel" }).click();
  await page.getByRole("textbox", { name: "Fuel" }).fill("Jet");
  await page.getByRole("spinbutton", { name: "Price" }).dblclick();
  await page.getByRole("spinbutton", { name: "Price" }).fill("9000");
  await page.getByRole("textbox", { name: "Photo URL" }).click();
  await page
    .getByRole("textbox", { name: "Photo URL" })
    .fill(
      "https://external-preview.redd.it/V5bU4RPx7sI6WPvXoYx5P1Y4MXxCnWqXA6r5_MQtO3Q.jpg?auto=webp&s=df7e02a40953745419d4bd7e1ee52cb5f0f81148"
    );
  await page.getByRole("button", { name: "Add Car", exact: true }).click();
  await expect(page.getByRole("img", { name: "Brand Car" })).toBeVisible();

  await page.getByRole("button", { name: "Delete" }).click();
  await expect(
    page.getByRole("heading", { name: "No cars to display..." })
  ).toBeVisible();
});
