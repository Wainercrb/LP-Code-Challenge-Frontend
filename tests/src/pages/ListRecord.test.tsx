import React from "react";
import ListRecordPage from "../../../src/pages/ListRecord";
import { describe, test, beforeAll, afterAll, afterEach, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../../src/utils/test-utils";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { Record } from "../../../src/models/Record";
import "@testing-library/jest-dom";

export const handlers = [
  http.get("/records", async () => {
    const records: Record[] = [
      {
        amount: 1,
        date: new Date(),
        id: 1,
        operation: {
          type: "addition",
          cost: 200,
        },
        operation_id: 1,
        operation_response: "{}",
        user: {
          username: "admin",
          role: "admin",
          balance: 1000,
        },
        user_id: 1,
      },
      {
        amount: 1,
        date: new Date(),
        id: 2,
        operation: {
          type: "addition",
          cost: 200,
        },
        operation_id: 1,
        operation_response: "{}",
        user: {
          username: "admin",
          role: "admin",
          balance: 500,
        },
        user_id: 1,
      },
    ];
    return HttpResponse.json({
      totalPages: 1,
      totalItems: 3,
      rows: records,
    });
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe("ListRecord Page", () => {
  test("Should render the loading skeleton", async () => {
    renderWithProviders(<ListRecordPage />);

    const skeletonItems = await screen.queryAllByTestId("record-table-skeleton-item");

    expect(skeletonItems).toBeDefined();
  });

  test("Should render the backend values content", async () => {
    // TODO: Add the rest of the columns

    renderWithProviders(<ListRecordPage />);

    const table = await screen.queryByTestId("record-table");

    expect(table).toBeInTheDocument();

    const adminRows = await screen.findAllByText("admin");

    expect(adminRows).toHaveLength(2);

    const operationRows = await screen.findAllByText("addition");

    expect(operationRows).toHaveLength(2);
  });
});
