import React from "react";
import ProfilePage from "../../../src/pages/Profile";
import { describe, test, beforeAll, afterAll, afterEach, expect } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import { renderWithProviders } from "../../../src/utils/test-utils";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { Role, User } from "../../../src/models/User";
import '@testing-library/jest-dom'

export const handlers = [
  http.get("/profile", async () => {
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

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe("Profile ", () => {
  test("Fetch and render page content", async () => {
    renderWithProviders(<ProfilePage />);

    await waitFor(() => {
      expect(screen.queryByTestId("circular-progress")).not.toBeInTheDocument();
    });
  });
});
