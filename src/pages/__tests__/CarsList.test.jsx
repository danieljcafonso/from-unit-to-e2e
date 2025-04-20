import { http, HttpResponse } from "msw";
import { server } from "../../mocks/server";
import { screen, within } from "../../utils/test-utils";
import CarsList from "../CarsList";

describe("CarsList tests", () => {
  it("should show loading spinner", async () => {
    render(<CarsList />);
    const loadingSpinner = await screen.findByRole("progressbar");
    expect(loadingSpinner).toBeVisible();
  });

  it("should show data", async () => {
    render(<CarsList />);
    const carCard = await screen.findByTestId("CarCard");
    const carImage = screen.getByRole("img", {
      name: /audi guinea/i,
    });
    expect(carCard).toBeVisible();
    expect(carImage).toBeVisible();
  });

  it("should show no cars warning when no data", async () => {
    server.use(http.get("*", () => HttpResponse.json(null, { status: 200 })));

    render(<CarsList />);
    const noCarsMessage = await screen.findByText("No cars to display...");
    expect(noCarsMessage).toBeVisible();
  });

  it("should delete a car", async () => {
    const { user } = render(<CarsList />);

    const buttonContainer = await screen.findByTestId("buttonContainer");
    const deleteButton = within(buttonContainer).getByRole("button", {
      name: /delete/i,
    });

    await user.click(deleteButton);

    const successMessage = await screen.findByText(/car was deleted/i);
    expect(successMessage).toBeVisible();
  });

  it("should fail to delete a car", async () => {
    server.use(
      http.delete("*", () => HttpResponse.json(null, { status: 403 }))
    );
    const { user } = render(<CarsList />);

    const buttonContainer = await screen.findByTestId("buttonContainer");
    const deleteButton = within(buttonContainer).getByRole("button", {
      name: /delete/i,
    });

    await user.click(deleteButton);

    const errorMessage = await screen.findByText(
      /something went wrong when deleting a car/i
    );
    expect(errorMessage).toBeVisible();
  });
});
