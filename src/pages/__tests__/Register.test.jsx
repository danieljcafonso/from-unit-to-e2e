import Register from "../Register";
import { dummyUserData } from "../../utils/test-utils";
import { useNavigate } from "react-router";
import { page } from "@vitest/browser/context";

const navigateMockFn = vi.fn();

describe("Register tests", () => {
  beforeEach(() => {
    useNavigate.mockImplementation(() => navigateMockFn);
  });

  it("should render", async () => {
    render(<Register />);
    const usernameInput = page.getByRole("textbox", {
      name: /username/i,
    });
    const emailInput = page.getByRole("textbox", {
      name: /email/i,
    });
    const registerButton = page.getByRole("button", {
      name: /register/i,
    });
    const createAccountLink = page.getByRole("link", {
      name: /i have an account/i,
    });

    await expect.element(usernameInput).toBeVisible();
    await expect.element(emailInput).toBeVisible();
    await expect.element(registerButton).toBeVisible();
    await expect.element(createAccountLink).toBeVisible();
  });

  it("should register", async () => {
    window.localStorage.setItem("loggedUser", null);

    render(<Register />);
    const usernameInput = page.getByRole("textbox", {
      name: /username/i,
    });
    const emailInput = page.getByRole("textbox", {
      name: /email/i,
    });
    const registerButton = page.getByRole("button", {
      name: /register/i,
    });
    await user.type(usernameInput, dummyUserData.username);
    await user.type(emailInput, dummyUserData.email);
    await user.click(registerButton);

    await expect(window.localStorage.getItem("loggedUser")).toBe(
      JSON.stringify(dummyUserData)
    );
  });

  it("should call navigate on logged user", async () => {
    window.localStorage.setItem("loggedUser", JSON.stringify(dummyUserData));

    render(<Register />);

    await expect(navigateMockFn).toHaveBeenCalledWith("/");
  });
});
