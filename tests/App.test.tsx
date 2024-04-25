import { describe, test, expect } from "vitest";
import { screen } from "@testing-library/react";

import App from "../src/App";
import { renderWithProviders } from "../src/utils/test-utils";

describe("App", () => {
  test("renders App component", () => {
    renderWithProviders(<App />);

    expect(screen.getByText("Battle of Monsters"));
  });
});
