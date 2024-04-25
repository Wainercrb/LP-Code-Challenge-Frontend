import React from "react";
import PrivateLayout from "../../../src/layouts/Public";
import { test, expect, describe, beforeAll, afterAll } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { http, HttpResponse, delay } from "msw";
import { Role, User } from "../../../src/models/User";
import { setupServer } from "msw/node";

export const handlers = [
  http.get("/verify-user", async () => {
    await delay(150);

    const response: User = {
      balance: 0,
      password: "",
      role: Role.admin,
      username: "admin",
    };
    return HttpResponse.json(response);
  }),
];

const server = setupServer(...handlers);

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterAll(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());


describe("PrivateLayout Component", () => {
  test("should render correctly with default props", () => {
    const { getByText } = render(
      <MemoryRouter>
        <PrivateLayout>
          <div>Hello World</div>
        </PrivateLayout>
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
