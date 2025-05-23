import "@testing-library/jest-dom/vitest";
import * as useLocalStorage from "./hooks/useLocalStorage";
import { dummyUserData } from "./utils/test-utils";
import { customRender } from "./utils/test-utils";

global.render = customRender; // make render available in all tests

vi.mock("react-router", () => ({
  ...vi.importActual("react-router"),
  useNavigate: vi.fn(),
  useLocation: vi.fn(),
}));

const useLocalStorageOriginalImplementation = useLocalStorage.default;

beforeEach(() => {
  useLocalStorage.default = vi.fn(() => [dummyUserData, vi.fn()]);
});
afterAll(() => {
  useLocalStorage.default = useLocalStorageOriginalImplementation;
});
