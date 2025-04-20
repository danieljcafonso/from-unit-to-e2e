import LandingPage from "../LandingPage";
import { page } from "@vitest/browser/context";

describe("LandingPage tests", () => {
  it("should render page", async () => {
    render(<LandingPage />);

    const landingPageText = page.getByText(
      "From Unit to E2Es — A Testing Guide to Sleeping Better at Night"
    );
    const landingPageButton = page.getByRole("button", {
      name: "Here is a button to query",
    });
    const landingPageImageTL = page.getByAltText("octopus");
    const landingPageImageRTL = page.getByAltText("goat");
    const landingPageImagePL = page.getByAltText("masks");

    await expect.element(landingPageText).toBeVisible();
    await expect.element(landingPageButton).toBeVisible();
    await expect.element(landingPageImageTL).toBeVisible();
    await expect.element(landingPageImageRTL).toBeVisible();
    await expect.element(landingPageImagePL).toBeVisible();
  });
});
