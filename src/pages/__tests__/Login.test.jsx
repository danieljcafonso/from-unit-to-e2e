import Login from "../Login";
import { screen, waitFor, dummyUserData } from "../../utils/test-utils";
import * as useLocalStorage from "../../hooks/useLocalStorage";
import { useNavigate } from "react-router";

const navigateMockFn = vi.fn();

const setLocalStorage = vi.fn();

describe("Login tests", () => {
  beforeEach(() => {
    useLocalStorage.default = vi.fn(() => [null, setLocalStorage]);
    useNavigate.mockImplementation(() => navigateMockFn);
  });

  it("should render", () => {
    render(<Login />);
    const usernameInput = screen.getByRole("textbox", {
      name: /username/i,
    });
    const emailInput = screen.getByRole("textbox", {
      name: /email/i,
    });
    const loginButton = screen.getByRole("button", {
      name: /login/i,
    });
    const createAccountLink = screen.getByRole("link", {
      name: /create an account/i,
    });

    expect(usernameInput).toBeVisible();
    expect(emailInput).toBeVisible();
    expect(loginButton).toBeVisible();
    expect(createAccountLink).toBeVisible();
  });

  it("should login", async () => {
    const { user } = render(<Login />);
    const usernameInput = screen.getByRole("textbox", {
      name: /username/i,
    });
    const emailInput = screen.getByRole("textbox", {
      name: /email/i,
    });
    const loginButton = screen.getByRole("button", {
      name: /login/i,
    });
    await user.type(usernameInput, dummyUserData.username);
    await user.type(emailInput, dummyUserData.email);
    await user.click(loginButton);

    await waitFor(() =>
      expect(setLocalStorage).toHaveBeenCalledWith(dummyUserData)
    );
  });

  it("should call navigate on logged user", async () => {
    useLocalStorage.default = vi.fn(() => ["danieljcafonso", setLocalStorage]);

    render(<Login />);

    await waitFor(() => expect(navigateMockFn).toHaveBeenCalledWith("/"));
  });
});
