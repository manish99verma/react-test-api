import { render, screen, waitFor } from "@testing-library/react";
import UsersList from "./UsersList";
import React from "react";

describe("UsersList Component", () => {
    beforeEach(() => {
        // Reset and mock fetch before each test
        global.fetch = vi.fn();
    });

    test("shows loading state initially", () => {
        // Mock fetch but do not resolve immediately
        global.fetch.mockImplementation(() => new Promise(() => { }));

        render(<UsersList />);

        expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    test("renders user list on success", async () => {
        const mockUsers = [
            {
                id: 1,
                name: "John Doe",
                email: "john@test.com",
                address: { street: "Main St", city: "Cityville" },
                phone: "12345",
                website: "example.com",
                company: { name: "ACME Corp", catchPhrase: "We do things!" },
            },
        ];

        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockUsers,
        });

        render(<UsersList />);

        expect(screen.getByText("Loading...")).toBeInTheDocument();

        expect(await screen.findByText("John Doe")).toBeInTheDocument();

        expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });

    test("shows error message on failed API call", async () => {
        global.fetch.mockRejectedValueOnce(new Error("Network Error"));

        render(<UsersList />);

        const errorEl = await screen.findByText(
            "Error: Please check your internet connection!"
        );

        expect(errorEl).toBeInTheDocument();
    });

    test("shows error on non-200 HTTP response", async () => {
        global.fetch.mockResolvedValueOnce({
            ok: false,
            json: async () => ({}),
        });

        render(<UsersList />);

        const errorEl = await screen.findByText(
            "Error: Please check your internet connection!"
        );

        expect(errorEl).toBeInTheDocument();
    });
});
