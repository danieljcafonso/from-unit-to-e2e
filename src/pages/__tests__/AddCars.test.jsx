import AddCars from "../AddCars";
import {
  screen,
  waitFor,
  dummyCarCreateData,
  dummyUserData,
} from "../../utils/test-utils";
import { useNavigate } from "react-router";
import { axiosInstance } from "../../api/carsAPI";

const navigateMockFn = vi.fn();
const postSpy = vi.spyOn(axiosInstance, "post");

describe("AddCars tests", () => {
  beforeEach(() => {
    useNavigate.mockImplementation(() => navigateMockFn);
    postSpy.mockResolvedValue({ data: dummyCarCreateData });
  });

  it("should render", () => {
    render(<AddCars />);
    const segment = screen.getByTestId(/segment/i);
    const model = screen.getByRole("textbox", {
      name: /model/i,
    });
    const brand = screen.getByRole("textbox", {
      name: /brand/i,
    });
    const fuel = screen.getByRole("textbox", {
      name: /fuel/i,
    });
    const price = screen.getByRole("spinbutton", {
      name: /price/i,
    });
    const photo = screen.getByRole("textbox", {
      name: /photo url/i,
    });
    const addButton = screen.getByRole("button", {
      name: /add car/i,
    });

    expect(segment).toBeInTheDocument();
    expect(model).toBeInTheDocument();
    expect(brand).toBeInTheDocument();
    expect(fuel).toBeInTheDocument();
    expect(price).toBeInTheDocument();
    expect(photo).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
  });

  it("shouldnt allow to submit an empty form", async () => {
    const { user } = render(<AddCars />);
    const addButton = screen.getByRole("button", {
      name: /add car/i,
    });
    await user.click(addButton);
    const errorMessage = await screen.findByText(/please fill in all data/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it("shouldnt allow to submit a negative number", async () => {
    const { user } = render(<AddCars />);
    const segment = screen.getByRole("combobox", {
      name: /segment/i,
    });
    const model = screen.getByRole("textbox", {
      name: /model/i,
    });
    const brand = screen.getByRole("textbox", {
      name: /brand/i,
    });
    const fuel = screen.getByRole("textbox", {
      name: /fuel/i,
    });
    const price = screen.getByRole("spinbutton", {
      name: /price/i,
    });
    const photo = screen.getByRole("textbox", {
      name: /photo url/i,
    });
    const addButton = screen.getByRole("button", {
      name: /add car/i,
    });

    await user.click(segment);
    const selectOption = screen.getByRole("option", {
      name: dummyCarCreateData.segment,
    });
    user.click(selectOption);
    await user.type(model, dummyCarCreateData.model);
    await user.type(brand, dummyCarCreateData.brand);
    await user.type(fuel, dummyCarCreateData.fuel);
    await user.clear(price);
    await user.type(price, "-1");
    await user.type(photo, dummyCarCreateData.photo);

    await user.click(addButton);

    const errorMessage = await screen.findByText(
      /the price needs to be greater than 0/i
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it("should add a car", async () => {
    const { user } = render(<AddCars />);
    const segment = screen.getByRole("combobox", {
      name: /segment/i,
    });
    const model = screen.getByRole("textbox", {
      name: /model/i,
    });
    const brand = screen.getByRole("textbox", {
      name: /brand/i,
    });
    const fuel = screen.getByRole("textbox", {
      name: /fuel/i,
    });
    const price = screen.getByRole("spinbutton", {
      name: /price/i,
    });
    const photo = screen.getByRole("textbox", {
      name: /photo url/i,
    });
    const addButton = screen.getByRole("button", {
      name: /add car/i,
    });

    await user.click(segment);
    const selectOption = screen.getByRole("option", {
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

    await waitFor(() => expect(postSpy).toHaveBeenCalled());
    expect(postSpy).toHaveBeenCalledWith(
      `/cars/${dummyUserData.username}`,
      dummyCarCreateData
    );
    const successMessage = await screen.findByText(/car was created/i);
    expect(successMessage).toBeInTheDocument();
  });

  it("should navigate to cars list after submit", async () => {
    const { user } = render(<AddCars />);
    const segment = screen.getByRole("combobox", {
      name: /segment/i,
    });
    const model = screen.getByRole("textbox", {
      name: /model/i,
    });
    const brand = screen.getByRole("textbox", {
      name: /brand/i,
    });
    const fuel = screen.getByRole("textbox", {
      name: /fuel/i,
    });
    const price = screen.getByRole("spinbutton", {
      name: /price/i,
    });
    const photo = screen.getByRole("textbox", {
      name: /photo url/i,
    });
    const addButton = screen.getByRole("button", {
      name: /add car/i,
    });

    await user.click(segment);
    const selectOption = screen.getByRole("option", {
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

    await waitFor(() => expect(navigateMockFn).toHaveBeenCalledWith("/cars"));
  });

  it("should show error on fail submit", async () => {
    postSpy.mockRejectedValue(new Error("something went wrong"));
    const { user } = render(<AddCars />);
    const segment = screen.getByRole("combobox", {
      name: /segment/i,
    });
    const model = screen.getByRole("textbox", {
      name: /model/i,
    });
    const brand = screen.getByRole("textbox", {
      name: /brand/i,
    });
    const fuel = screen.getByRole("textbox", {
      name: /fuel/i,
    });
    const price = screen.getByRole("spinbutton", {
      name: /price/i,
    });
    const photo = screen.getByRole("textbox", {
      name: /photo url/i,
    });
    const addButton = screen.getByRole("button", {
      name: /add car/i,
    });

    await user.click(segment);
    const selectOption = screen.getByRole("option", {
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

    const errorMessage = await screen.findByText(
      /something went wrong when creating a car/i
    );
    expect(errorMessage).toBeInTheDocument();
  });
});
