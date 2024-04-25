import React from "react";
import PublicLayout from "../../../src/layouts/Public";
import { test, expect, describe } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

describe("PublicLayout Component", () => {
  test("should render correctly with default props", () => {
    const { getByText } = render(
      <MemoryRouter>
        <PublicLayout>
          <div>Hello World</div>
        </PublicLayout>
      </MemoryRouter>
    );

    const appTitle = getByText("Load Pro");
    expect(appTitle).toBeInTheDocument();

    const signInButton = getByText("Sign In");
    expect(signInButton).toBeInTheDocument();

    const mainContent = getByText("Hello World");
    expect(mainContent).toBeInTheDocument();

    const footerTitle = getByText("Load Pro Code Challenge");
    expect(footerTitle).toBeInTheDocument();
  });
});
