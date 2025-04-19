import Register from "../Register";
import { screen, waitFor, dummyUserData } from "../../utils/test-utils";
import * as useLocalStorage from "../../hooks/useLocalStorage";
import { useNavigate } from "react-router";
import { axiosInstance } from "../../api/carsAPI";

const navigateMockFn = vi.fn();

const postSpy = vi.spyOn(axiosInstance, "post");

const setLocalStorage = vi.fn();

describe("Register tests", () => {
  beforeEach(() => {
    useLocalStorage.default = vi.fn(() => [null, setLocalStorage]);
    useNavigate.mockImplementation(() => navigateMockFn);
    postSpy.mockResolvedValue({ data: dummyUserData });
  });

  it("should render", () => {
    render(<Register />);
    const usernameInput = screen.getByRole("textbox", {
      name: /username/i,
    });
    const emailInput = screen.getByRole("textbox", {
      name: /email/i,
    });
    const registerButton = screen.getByRole("button", {
      name: /register/i,
    });
    const createAccountLink = screen.getByRole("link", {
      name: /i have an account/i,
    });

    expect(usernameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
    expect(createAccountLink).toBeInTheDocument();
  });

  it("should register", async () => {
    const { user } = render(<Register />);
    const usernameInput = screen.getByRole("textbox", {
      name: /username/i,
    });
    const emailInput = screen.getByRole("textbox", {
      name: /email/i,
    });
    const registerButton = screen.getByRole("button", {
      name: /register/i,
    });
    await user.type(usernameInput, dummyUserData.username);
    await user.type(emailInput, dummyUserData.email);
    await user.click(registerButton);

    await waitFor(() =>
      expect(setLocalStorage).toHaveBeenCalledWith(dummyUserData)
    );
  });

  it("should call navigate on logged user", async () => {
    useLocalStorage.default = vi.fn(() => ["danieljcafonso", setLocalStorage]);

    render(<Register />);

    await waitFor(() => expect(navigateMockFn).toHaveBeenCalledWith("/"));
  });
});
