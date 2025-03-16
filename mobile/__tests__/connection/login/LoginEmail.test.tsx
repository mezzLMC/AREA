/**
 * @jest-environment node
 */
 /* eslint-disable */


import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import LoginEmail from "src/connection/login/LoginEmail";

jest.mock("src/hooks/useApi", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    auth: {
      login: jest.fn().mockResolvedValue({ body: { token: "mocked-token" } }),
    },
  })),
}));

describe("LoginEmail Component", () => {
  const mockSetModalVisible = jest.fn();

  const renderWithNavigation = (component: JSX.Element) =>
    render(<NavigationContainer>{component}</NavigationContainer>);

  it("renders inputs and button correctly", () => {
    const { getByTestId } = renderWithNavigation(
      <LoginEmail modalVisible={true} setModalVisible={mockSetModalVisible} />
    );
    expect(getByTestId("email-input")).toBeTruthy();
    expect(getByTestId("password-input")).toBeTruthy();
    expect(getByTestId("sign-in-button")).toBeTruthy();
  });

  it("submits the form successfully with valid inputs", async () => {
    const mockApi = {
      auth: {
        login: jest.fn().mockResolvedValue({ body: { token: "mockToken" } }),
      },
    };
    jest.spyOn(require("src/hooks/useApi"), "default").mockReturnValue(mockApi);
    const { getByTestId } = renderWithNavigation(
      <LoginEmail modalVisible={true} setModalVisible={mockSetModalVisible} />
    );

    fireEvent.changeText(getByTestId("email-input"), "test@example.com");
    fireEvent.changeText(getByTestId("password-input"), "password123");
    fireEvent.press(getByTestId("sign-in-button"));

    await waitFor(() => {
      expect(mockApi.auth.login).toHaveBeenCalledWith("test@example.com", "password123");
      expect(mockSetModalVisible).toHaveBeenCalledWith(false);
    });
  });
});
