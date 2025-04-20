import { http, HttpResponse } from "msw";
import { worker } from "../../mocks/worker";
import CarsList from "../CarsList";
import { page } from "@vitest/browser/context";

describe("CarsList tests", () => {
  it("should show loading spinner", async () => {
    render(<CarsList />);
    const loadingSpinner = page.getByRole("progressbar");
    await expect.element(loadingSpinner).toBeVisible();
  });

  it("should show data", async () => {
    render(<CarsList />);
    const carCard = page.getByTestId("CarCard");
    const carImage = page.getByRole("img", {
      name: /audi guinea/i,
    });
    await expect.element(carCard).toBeVisible();
    await expect.element(carImage).toBeVisible();
  });

  it("should show no cars warning when no data", async () => {
    worker.use(http.get("*", () => HttpResponse.json(null, { status: 200 })));

    render(<CarsList />);
    const noCarsMessage = page.getByText("No cars to display...");
    await expect.element(noCarsMessage).toBeVisible();
  });

  it("should delete a car", async () => {
    render(<CarsList />);

    const deleteButton = page.getByRole("button", {
      name: /delete/i,
    });

    await user.click(deleteButton);

    const successMessage = page.getByText(/car was deleted/i);
    await expect.element(successMessage).toBeVisible();
  });

  it("should fail to delete a car", async () => {
    worker.use(
      http.delete("*", () => HttpResponse.json(null, { status: 403 }))
    );
    render(<CarsList />);

    const deleteButton = page.getByRole("button", {
      name: /delete/i,
    });

    await user.click(deleteButton);

    const errorMessage = page.getByText(
      /something went wrong when deleting a car/i
    );
    await expect.element(errorMessage).toBeVisible();
  });
});
