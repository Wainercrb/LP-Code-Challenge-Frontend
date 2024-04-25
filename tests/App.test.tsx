import React from "react";
import App from "../src/App";
import { describe, test, beforeAll, afterAll, expect } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import { renderWithProviders } from "../src/utils/test-utils";
import { http, HttpResponse, delay } from "msw";
import { setupServer } from "msw/node";
import { Role, User } from "../src/models/User";

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

describe("App", () => {
  test("renders App component", async () => {
    renderWithProviders(<App />, {
      preloadedState: {
        userReducer: {
          user: { name: "test xd" },
        },
      },
    });

    await waitFor(() => {
      expect(screen.getByTestId("dashboard-title")).to.toBeInTheDocument();
    });
  });
});
