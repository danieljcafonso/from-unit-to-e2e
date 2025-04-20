import AddCars from "../AddCars";
import { dummyCarCreateData } from "../../utils/test-utils";
import { useNavigate } from "react-router";
import { http, HttpResponse } from "msw";
import { worker } from "../../mocks/worker";
import { page } from "@vitest/browser/context";

const navigateMockFn = vi.fn();

describe("AddCars tests", () => {
  beforeEach(() => {
    useNavigate.mockImplementation(() => navigateMockFn);
  });

  it("should render", async () => {
    render(<AddCars />);
    const segment = page.getByTestId(/segment/i);
    const model = page.getByRole("textbox", {
      name: /model/i,
    });
    const brand = page.getByRole("textbox", {
      name: /brand/i,
    });
    const fuel = page.getByRole("textbox", {
      name: /fuel/i,
    });
    const price = page.getByRole("spinbutton", {
      name: /price/i,
    });
    const photo = page.getByRole("textbox", {
      name: /photo url/i,
    });
    const addButton = page.getByRole("button", {
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
    render(<AddCars />);
    const addButton = page.getByRole("button", {
      name: /add car/i,
    });
    await user.click(addButton);
    const errorMessage = page.getByText(/please fill in all data/i);
    await expect.element(errorMessage).toBeVisible();
  });

  it("shouldnt allow to submit a negative number", async () => {
    render(<AddCars />);
    const segment = page.getByRole("combobox", {
      name: /segment/i,
    });
    const model = page.getByRole("textbox", {
      name: /model/i,
    });
    const brand = page.getByRole("textbox", {
      name: /brand/i,
    });
    const fuel = page.getByRole("textbox", {
      name: /fuel/i,
    });
    const price = page.getByRole("spinbutton", {
      name: /price/i,
    });
    const photo = page.getByRole("textbox", {
      name: /photo url/i,
    });
    const addButton = page.getByRole("button", {
      name: /add car/i,
    });

    await user.click(segment);
    const selectOption = page.getByRole("option", {
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

    const errorMessage = page.getByText(
      /the price needs to be greater than 0/i
    );
    await expect.element(errorMessage).toBeVisible();
  });

  it("should add a car", async () => {
    render(<AddCars />);
    const segment = page.getByRole("combobox", {
      name: /segment/i,
    });
    const model = page.getByRole("textbox", {
      name: /model/i,
    });
    const brand = page.getByRole("textbox", {
      name: /brand/i,
    });
    const fuel = page.getByRole("textbox", {
      name: /fuel/i,
    });
    const price = page.getByRole("spinbutton", {
      name: /price/i,
    });
    const photo = page.getByRole("textbox", {
      name: /photo url/i,
    });
    const addButton = page.getByRole("button", {
      name: /add car/i,
    });

    await user.click(segment);
    const selectOption = page.getByRole("option", {
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

    const successMessage = page.getByText(/car was created/i);
    await expect.element(successMessage).toBeVisible();
  });

  it("should navigate to cars list after submit", async () => {
    render(<AddCars />);
    const segment = page.getByRole("combobox", {
      name: /segment/i,
    });
    const model = page.getByRole("textbox", {
      name: /model/i,
    });
    const brand = page.getByRole("textbox", {
      name: /brand/i,
    });
    const fuel = page.getByRole("textbox", {
      name: /fuel/i,
    });
    const price = page.getByRole("spinbutton", {
      name: /price/i,
    });
    const photo = page.getByRole("textbox", {
      name: /photo url/i,
    });
    const addButton = page.getByRole("button", {
      name: /add car/i,
    });

    await user.click(segment);
    const selectOption = page.getByRole("option", {
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

    render(<AddCars />);
    const segment = page.getByRole("combobox", {
      name: /segment/i,
    });
    const model = page.getByRole("textbox", {
      name: /model/i,
    });
    const brand = page.getByRole("textbox", {
      name: /brand/i,
    });
    const fuel = page.getByRole("textbox", {
      name: /fuel/i,
    });
    const price = page.getByRole("spinbutton", {
      name: /price/i,
    });
    const photo = page.getByRole("textbox", {
      name: /photo url/i,
    });
    const addButton = page.getByRole("button", {
      name: /add car/i,
    });

    await user.click(segment);
    const selectOption = page.getByRole("option", {
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

    const errorMessage = page.getByText(
      /something went wrong when creating a car/i
    );
    await expect.element(errorMessage).toBeVisible();
  });
});
