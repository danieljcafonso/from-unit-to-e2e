import { worker } from "./mocks/worker";
import { customRender, dummyUserData } from "./utils/test-utils";
import { userEvent } from "@vitest/browser/context";

window.render = customRender; // make render available in all tests
window.user = userEvent.setup();

vi.mock("react-router", () => ({
  ...vi.importActual("react-router"),
  useNavigate: vi.fn(),
  useLocation: vi.fn(),
}));

beforeAll(() => worker.start());
afterEach(() => worker.resetHandlers());

beforeEach(() => {
  window.localStorage.setItem("loggedUser", JSON.stringify(dummyUserData));
});
afterAll(() => {
  window.localStorage.setItem("loggedUser", null);
  worker.stop();
});
