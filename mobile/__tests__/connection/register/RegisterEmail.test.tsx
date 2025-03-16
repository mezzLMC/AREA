/**
 * @jest-environment node
 */
 /* eslint-disable */


import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import RegisterEmail from "src/connection/register/RegisterEmail";

const renderWithNavigation = (component: JSX.Element) =>
  render(<NavigationContainer>{component}</NavigationContainer>);

describe("RegisterEmail Component", () => {
  let setModalVisibleMock: jest.Mock;

  beforeEach(() => {
    setModalVisibleMock = jest.fn();
  });

  it("renders the modal when modalVisible is true", () => {
    const { getByText } = renderWithNavigation(<RegisterEmail modalVisible={true} setModalVisible={setModalVisibleMock} />);
    expect(getByText("Welcome to AREA")).toBeTruthy();
  });

  it("submits the form successfully with valid inputs", async () => {
    const mockApi = {
      auth: {
        register: jest.fn().mockResolvedValue({ body: { token: "mockToken" } }),
      },
    };
    jest.spyOn(require("src/hooks/useApi"), "default").mockReturnValue(mockApi);
    const { getByTestId } = renderWithNavigation(<RegisterEmail modalVisible={true} setModalVisible={setModalVisibleMock} />);

    fireEvent.changeText(getByTestId("email-input"), "test@example.com");
    fireEvent.changeText(getByTestId("username-input"), "testuser");
    fireEvent.changeText(getByTestId("password-input"), "password123");
    fireEvent.press(getByTestId("signup-button"));
    await waitFor(() => {
      expect(mockApi.auth.register).toHaveBeenCalledWith({
        email: "test@example.com",
        username: "testuser",
        password: "password123",
      });
      expect(setModalVisibleMock).toHaveBeenCalledWith(false);
    });
  });
});
