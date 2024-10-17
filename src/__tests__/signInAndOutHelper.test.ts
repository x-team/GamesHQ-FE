import { handleLogoutClick } from "../helpers/signInAndOutHelper";
import { logOutFromGamesAPI } from "../api/signInAndOut";

jest.mock("../api/signInAndOut", () => ({
  logOutFromGamesAPI: jest.fn(),
}));

describe("handleLogoutClick", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it("should return true and clear localStorage on successful logout", async () => {
    const mockSession = { token: "mock-token" };
    localStorage.setItem("session", JSON.stringify(mockSession));
    localStorage.setItem("currentUser", JSON.stringify({ id: 1 }));
    (logOutFromGamesAPI as jest.Mock).mockResolvedValue({ success: true });

    const result = await handleLogoutClick();

    expect(result).toBe(true);
    expect(localStorage.getItem("session")).toBeNull();
    expect(localStorage.getItem("currentUser")).toBeNull();
    expect(logOutFromGamesAPI).toHaveBeenCalledWith("mock-token");
  });

  it("should return false and clear localStorage on unsuccessful logout", async () => {
    const mockSession = { token: "mock-token" };
    localStorage.setItem("session", JSON.stringify(mockSession));
    localStorage.setItem("currentUser", JSON.stringify({ id: 1 }));
    (logOutFromGamesAPI as jest.Mock).mockResolvedValue({
      success: false,
      message: "Error message",
    });

    const result = await handleLogoutClick();

    expect(result).toBe(false);
    expect(localStorage.getItem("session")).toBeNull();
    expect(localStorage.getItem("currentUser")).toBeNull();
    expect(logOutFromGamesAPI).toHaveBeenCalledWith("mock-token");
  });

  it("should do nothing and return undefined when no session in localStorage", async () => {
    localStorage.clear();

    const result = await handleLogoutClick();

    expect(result).toBeUndefined();
    expect(logOutFromGamesAPI).not.toHaveBeenCalled();
  });

  it("should handle JSON parsing errors", async () => {
    localStorage.setItem("session", "invalid-json");

    await expect(handleLogoutClick()).rejects.toThrow(SyntaxError);
  });
});
