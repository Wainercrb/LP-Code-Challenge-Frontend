import React from "react";
import { describe, test, expect } from "vitest";
import { render } from "@testing-library/react";
import AppProvider from "../../../src/redux/provider";

describe("AppProvider", () => {
  test("renders children correctly", () => {
    // Arrange
    const children = <div>Test Children</div>;

    // Act
    const { getByText } = render(<AppProvider>{children}</AppProvider>);

    // Assert
    expect(getByText("Test Children")).toBeInTheDocument();
  });

  // Add more test cases as needed
});
