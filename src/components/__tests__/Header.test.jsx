import { dummyUserData } from "../../utils/test-utils";
import Header from "../Header";
import { useNavigate, useLocation } from "react-router";

const navigateMockFn = vi.fn();

describe("Header tests", () => {
  beforeEach(() => {
    navigateMockFn.mockClear();
    useNavigate.mockImplementation(() => navigateMockFn);
    useLocation.mockImplementation(() => ({ pathname: "/" }));
  });

  it("should render", async () => {
    const screen = render(<Header />);

    const carsList = await screen.getByRole("button", {
      name: /my cars/i,
    });
    const addCars = await screen.getByRole("button", {
      name: /add cars/i,
    });
    const themeToggle = await screen.getByRole("button", {
      name: /change theme/i,
    });

    await expect.element(carsList).toBeVisible();
    await expect.element(addCars).toBeVisible();
    await expect.element(themeToggle).toBeVisible();
  });

  it("should render logout button when authenticated", async () => {
    const screen = render(<Header />);

    const logoutButton = await screen.getByLabelText(
      `Logout from ${dummyUserData.username}`
    );
    await expect.element(logoutButton).toBeVisible();
  });

  it("should logout on logout click", async () => {
    const screen = render(<Header />);
    const logoutButton = await screen.getByLabelText(
      `Logout from ${dummyUserData.username}`
    );

    await user.click(logoutButton);
    await expect(window.localStorage.getItem("loggedUser")).toBe("null");
  });

  it("should redirect to login when unauthenticated and on homepage", async () => {
    window.localStorage.setItem("loggedUser", null);
    render(<Header />);
    await expect(navigateMockFn).toHaveBeenCalledWith("/login");
  });

  it("shouldnt redirect to login when authenticated", async () => {
    render(<Header />);
    await expect(navigateMockFn).not.toHaveBeenCalledWith("/login");
  });

  it("shouldnt redirect to login when unauthenticated and on login page", async () => {
    useLocation.mockImplementation(() => ({ pathname: "/login" }));
    render(<Header />);
    await expect(navigateMockFn).not.toHaveBeenCalledWith("/login");
  });

  it("shouldnt redirect to login when unauthenticated and on register page", async () => {
    useLocation.mockImplementation(() => ({ pathname: "/register" }));
    render(<Header />);
    await expect(navigateMockFn).not.toHaveBeenCalledWith("/login");
  });

  it("should navigate to new page on nav item click", async () => {
    const screen = render(<Header />);

    const carsList = await screen.getByRole("button", {
      name: /my cars/i,
    });
    await user.click(carsList);
    await expect(navigateMockFn).toHaveBeenCalledWith("/cars");
  });

  it("should have dark mode toggled on", async () => {
    const screen = render(<Header isDarkMode={true} />);
    const darkModeButton = await screen.getByTestId("dark_mode");
    await expect.element(darkModeButton).toBeVisible();
  });

  it("should have light mode toggled on", async () => {
    const screen = render(<Header isDarkMode={false} />);
    const lightModeButton = await screen.getByTestId("light_mode");
    await expect.element(lightModeButton).toBeVisible();
  });
});
