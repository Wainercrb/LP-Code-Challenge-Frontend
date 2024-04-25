import { describe, test, expect } from "vitest";
import reducer, {
  setUser,
} from "../../../../src/redux/features/userSlice";

describe("userSlice", () => {
  test("should return the initial state", () => {
    expect(reducer(undefined, { type: "" })).toEqual({
      user: undefined,
      isInitialized: false,
    });
  });

  test("Should add the user to the state", () => {
    const previousState = {
      user: undefined,
      isInitialized: false,
    };

    expect(
      reducer(previousState, setUser({ id: 1, username: "1", balance: 0 }))
    ).toEqual({
      user: {
        id: 1,
        username: "1",
        balance: 0,
      },
      isInitialized: true,
    });
  });
});
