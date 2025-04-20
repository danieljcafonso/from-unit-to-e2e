import AddCars from "../AddCars";
import { dummyCarCreateData } from "../../utils/test-utils";
import { useNavigate } from "react-router";
import { http, HttpResponse } from "msw";
import { worker } from "../../mocks/worker";

const navigateMockFn = vi.fn();

describe("AddCars tests", () => {
  beforeEach(() => {
    useNavigate.mockImplementation(() => navigateMockFn);
  });

  it("should render", async () => {
    const screen = render(<AddCars />);
    const segment = await screen.getByTestId(/segment/i);
    const model = await screen.getByRole("textbox", {
      name: /model/i,
    });
    const brand = await screen.getByRole("textbox", {
      name: /brand/i,
    });
    const fuel = await screen.getByRole("textbox", {
      name: /fuel/i,
    });
    const price = await screen.getByRole("spinbutton", {
      name: /price/i,
    });
    const photo = await screen.getByRole("textbox", {
      name: /photo url/i,
    });
    const addButton = await screen.getByRole("button", {
      name: /add car/i,
    });

    await expect.element(segment).toBeVisible();
    await expect.element(model).toBeVisible();
    await expect.element(brand).toBeVisible();
    await expect.element(fuel).toBeVisible();
    await expect.element(price).toBeVisible();
    await expect.element(photo).toBeVisible();
    await expect.element(addButton).toBeVisible();
  });

  it("shouldnt allow to submit an empty form", async () => {
    const screen = render(<AddCars />);
    const addButton = await screen.getByRole("button", {
      name: /add car/i,
    });
    await user.click(addButton);
    const errorMessage = await screen.getByText(/please fill in all data/i);
    await expect.element(errorMessage).toBeVisible();
  });

  it("shouldnt allow to submit a negative number", async () => {
    const screen = render(<AddCars />);
    const segment = await screen.getByRole("combobox", {
      name: /segment/i,
    });
    const model = await screen.getByRole("textbox", {
      name: /model/i,
    });
    const brand = await screen.getByRole("textbox", {
      name: /brand/i,
    });
    const fuel = await screen.getByRole("textbox", {
      name: /fuel/i,
    });
    const price = await screen.getByRole("spinbutton", {
      name: /price/i,
    });
    const photo = await screen.getByRole("textbox", {
      name: /photo url/i,
    });
    const addButton = await screen.getByRole("button", {
      name: /add car/i,
    });

    await user.click(segment);
    const selectOption = await screen.getByRole("option", {
      name: dummyCarCreateData.segment,
    });
    await user.click(selectOption);
    await user.type(model, dummyCarCreateData.model);
    await user.type(brand, dummyCarCreateData.brand);
    await user.type(fuel, dummyCarCreateData.fuel);
    await user.clear(price);
    await user.type(price, "-1");
    await user.type(photo, dummyCarCreateData.photo);

    await user.click(addButton);

    const errorMessage = await screen.getByText(
      /the price needs to be greater than 0/i
    );
    await expect.element(errorMessage).toBeVisible();
  });

  it("should add a car", async () => {
    const screen = render(<AddCars />);
    const segment = await screen.getByRole("combobox", {
      name: /segment/i,
    });
    const model = await screen.getByRole("textbox", {
      name: /model/i,
    });
    const brand = await screen.getByRole("textbox", {
      name: /brand/i,
    });
    const fuel = await screen.getByRole("textbox", {
      name: /fuel/i,
    });
    const price = await screen.getByRole("spinbutton", {
      name: /price/i,
    });
    const photo = await screen.getByRole("textbox", {
      name: /photo url/i,
    });
    const addButton = await screen.getByRole("button", {
      name: /add car/i,
    });

    await user.click(segment);
    const selectOption = await screen.getByRole("option", {
      name: dummyCarCreateData.segment,
    });
    await user.click(selectOption);
    await user.type(model, dummyCarCreateData.model);
    await user.type(brand, dummyCarCreateData.brand);
    await user.type(fuel, dummyCarCreateData.fuel);
    await user.clear(price);
    await user.type(price, dummyCarCreateData.price);
    await user.type(photo, dummyCarCreateData.photo);

    await user.click(addButton);

    const successMessage = await screen.getByText(/car was created/i);
    await expect.element(successMessage).toBeVisible();
  });

  it("should navigate to cars list after submit", async () => {
    const screen = render(<AddCars />);
    const segment = await screen.getByRole("combobox", {
      name: /segment/i,
    });
    const model = await screen.getByRole("textbox", {
      name: /model/i,
    });
    const brand = await screen.getByRole("textbox", {
      name: /brand/i,
    });
    const fuel = await screen.getByRole("textbox", {
      name: /fuel/i,
    });
    const price = await screen.getByRole("spinbutton", {
      name: /price/i,
    });
    const photo = await screen.getByRole("textbox", {
      name: /photo url/i,
    });
    const addButton = await screen.getByRole("button", {
      name: /add car/i,
    });

    await user.click(segment);
    const selectOption = await screen.getByRole("option", {
      name: dummyCarCreateData.segment,
    });
    await user.click(selectOption);
    await user.type(model, dummyCarCreateData.model);
    await user.type(brand, dummyCarCreateData.brand);
    await user.type(fuel, dummyCarCreateData.fuel);
    await user.clear(price);
    await user.type(price, dummyCarCreateData.price);
    await user.type(photo, dummyCarCreateData.photo);

    await user.click(addButton);

    await expect(navigateMockFn).toHaveBeenCalledWith("/cars");
  });

  it("should show error on fail submit", async () => {
    worker.use(http.post("*", () => HttpResponse.json(null, { status: 403 })));
    const screen = render(<AddCars />);
    const segment = await screen.getByRole("combobox", {
      name: /segment/i,
    });
    const model = await screen.getByRole("textbox", {
      name: /model/i,
    });
    const brand = await screen.getByRole("textbox", {
      name: /brand/i,
    });
    const fuel = await screen.getByRole("textbox", {
      name: /fuel/i,
    });
    const price = await screen.getByRole("spinbutton", {
      name: /price/i,
    });
    const photo = await screen.getByRole("textbox", {
      name: /photo url/i,
    });
    const addButton = await screen.getByRole("button", {
      name: /add car/i,
    });

    await user.click(segment);
    const selectOption = await screen.getByRole("option", {
      name: dummyCarCreateData.segment,
    });
    await user.click(selectOption);
    await user.type(model, dummyCarCreateData.model);
    await user.type(brand, dummyCarCreateData.brand);
    await user.type(fuel, dummyCarCreateData.fuel);
    await user.clear(price);
    await user.type(price, dummyCarCreateData.price);
    await user.type(photo, dummyCarCreateData.photo);

    await user.click(addButton);

    const errorMessage = await screen.getByText(
      /something went wrong when creating a car/i
    );
    await expect.element(errorMessage).toBeVisible();
  });
});
