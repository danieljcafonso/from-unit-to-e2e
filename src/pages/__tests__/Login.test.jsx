import Login from "../Login";
import { dummyUserData } from "../../utils/test-utils";
import { useNavigate } from "react-router";
import { page } from "@vitest/browser/context";

const navigateMockFn = vi.fn();

describe("Login tests", () => {
  beforeEach(() => {
    useNavigate.mockImplementation(() => navigateMockFn);
  });

  it("should render", async () => {
    render(<Login />);
    const usernameInput = page.getByRole("textbox", {
      name: /username/i,
    });
    const emailInput = page.getByRole("textbox", {
      name: /email/i,
    });
    const loginButton = page.getByRole("button", {
      name: /login/i,
    });
    const createAccountLink = page.getByRole("link", {
      name: /create an account/i,
    });

    await expect.element(usernameInput).toBeVisible();
    await expect.element(emailInput).toBeVisible();
    await expect.element(loginButton).toBeVisible();
    await expect.element(createAccountLink).toBeVisible();
  });

  it("should login", async () => {
    window.localStorage.setItem("loggedUser", null);

    render(<Login />);
    const usernameInput = page.getByRole("textbox", {
      name: /username/i,
    });
    const emailInput = page.getByRole("textbox", {
      name: /email/i,
    });
    const loginButton = page.getByRole("button", {
      name: /login/i,
    });
    await user.type(usernameInput, dummyUserData.username);
    await user.type(emailInput, dummyUserData.email);
    await user.click(loginButton);

    await expect(window.localStorage.getItem("loggedUser")).toBe(
      JSON.stringify(dummyUserData)
    );
  });

  it("should call navigate on logged user", async () => {
    window.localStorage.setItem("loggedUser", JSON.stringify(dummyUserData));

    render(<Login />);

    await expect(navigateMockFn).toHaveBeenCalledWith("/");
  });
});
