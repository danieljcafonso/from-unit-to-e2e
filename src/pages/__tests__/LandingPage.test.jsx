import LandingPage from "../LandingPage";

describe("LandingPage tests", () => {
  it("should render page", () => {
    const { getByText, getByRole, getByAltText } = render(<LandingPage />);

    const landingPageText = getByText(
      "From Unit to E2Es — A Testing Guide to Sleeping Better at Night"
    );
    const landingPageButton = getByRole("button", {
      name: "Here is a button to query",
    });
    const landingPageImageTL = getByAltText("octopus");
    const landingPageImageRTL = getByAltText("goat");
    const landingPageImagePL = getByAltText("masks");

    expect(landingPageText).toBeVisible();
    expect(landingPageButton).toBeVisible();
    expect(landingPageImageTL).toBeVisible();
    expect(landingPageImageRTL).toBeVisible();
    expect(landingPageImagePL).toBeVisible();
  });
});
