import CarsList from "../CarsList";
import { screen, within, dummyCarData } from "../../utils/test-utils";
import { axiosInstance } from "../../api/carsAPI";

const getSpy = vi.spyOn(axiosInstance, "get");
const deleteSpy = vi.spyOn(axiosInstance, "delete");

describe("CarsList tests", () => {
  beforeEach(() => {
    getSpy.mockResolvedValue(dummyCarData);
    deleteSpy.mockResolvedValue({});
  });

  it("should show loading spinner", async () => {
    render(<CarsList />);
    const loadingSpinner = await screen.findByRole("progressbar");
    expect(loadingSpinner).toBeInTheDocument();
  });

  it("should show data", async () => {
    render(<CarsList />);
    const carCard = await screen.findByTestId("CarCard");
    const carImage = screen.getByRole("img", {
      name: /audi guinea/i,
    });
    expect(carCard).toBeInTheDocument();
    expect(carImage).toBeInTheDocument();
  });

  it("should show no cars warning when no data", async () => {
    getSpy.mockResolvedValue({
      data: {},
    });

    render(<CarsList />);
    const noCarsMessage = await screen.findByText("No cars to display...");
    expect(noCarsMessage).toBeInTheDocument();
  });

  it("should delete a car", async () => {
    const { user } = render(<CarsList />);

    const buttonContainer = await screen.findByTestId("buttonContainer");
    const deleteButton = within(buttonContainer).getByRole("button", {
      name: /delete/i,
    });

    await user.click(deleteButton);

    const successMessage = await screen.findByText(/car was deleted/i);
    expect(successMessage).toBeInTheDocument();
  });

  it("should fail to delete a car", async () => {
    deleteSpy.mockRejectedValue(new Error("something went wrong"));

    const { user } = render(<CarsList />);

    const buttonContainer = await screen.findByTestId("buttonContainer");
    const deleteButton = within(buttonContainer).getByRole("button", {
      name: /delete/i,
    });

    await user.click(deleteButton);

    const errorMessage = await screen.findByText(
      /something went wrong when deleting a car/i
    );
    expect(errorMessage).toBeInTheDocument();
  });
});
