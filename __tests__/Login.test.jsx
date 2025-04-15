import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import Login from "../src/app/(auth)/login/page";
import { AuthProvider, useAuth } from "../src/app/context/AuthContext";
import { useRouter } from "next/navigation";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mock useAuth hook
jest.mock("../src/app/context/AuthContext", () => ({
  useAuth: jest.fn(),
  AuthProvider: ({ children }) => <div>{children}</div>,
}));

const Wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>;

describe("Login", () => {
  let mockPush;
  let mockLogin;

  beforeEach(() => {
    // Mock useRouter
    mockPush = jest.fn();
    useRouter.mockReturnValue({
      push: mockPush,
      pathname: "/",
      query: {},
    });

    // Mock useAuth
    mockLogin = jest.fn();
    useAuth.mockReturnValue({
      login: mockLogin,
    });

    // Mock fetch
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ user: { id: 1, email: "test@example.com" } }),
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render a login form", () => {
    const { getByText, getByLabelText } = render(<Login />, { wrapper: Wrapper });
    expect(getByText("Login")).toBeInTheDocument();
    expect(getByLabelText("Email")).toBeInTheDocument();
    expect(getByLabelText("Password")).toBeInTheDocument();
  });

  it("should call login and redirect when the form is submitted", async () => {
    const { getByLabelText, getByText } = render(<Login />, { wrapper: Wrapper });

    const emailInput = getByLabelText("Email");
    const passwordInput = getByLabelText("Password");
    const submitButton = getByText("Login");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_email: "test@example.com",
          user_password: "password",
        }),
      });
      expect(mockLogin).toHaveBeenCalledWith(1); // Hardcoded userId in handleSubmit
      expect(mockPush).toHaveBeenCalledWith("/");
    });
  });
});