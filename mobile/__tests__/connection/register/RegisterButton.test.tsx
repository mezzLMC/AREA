/**
 * @jest-environment node
 */
 /* eslint-disable */


import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { View } from "react-native";
import RegisterButtons from "src/connection/register/RegisterButtons";
import { NavigationContainer } from "@react-navigation/native";

jest.mock('src/connection/register/RegisterEmail', () => {
  const MockRegisterEmail = ({ modalVisible }: { modalVisible: boolean }) =>
    modalVisible ? <View testID="register-email-modal" /> : null;
  MockRegisterEmail.displayName = 'MockRegisterEmail';
  return MockRegisterEmail;
});

jest.mock('src/connection/GoogleAuth', () => {
  const MockGoogleAuth = ({ showWebView }: { showWebView: boolean }) =>
    showWebView ? <View testID="google-auth-modal" /> : null;
  MockGoogleAuth.displayName = 'MockGoogleAuth';
  return MockGoogleAuth;
});

const renderWithNavigation = (component: JSX.Element) => render(<NavigationContainer>{component}</NavigationContainer>);

describe("RegisterButtons Component", () => {
  it("renders all buttons correctly", () => {
    const { getByTestId } = renderWithNavigation(<RegisterButtons testID="register-buttons" />);
    expect(getByTestId("google-signup-button")).toBeTruthy();
    expect(getByTestId("facebook-signup-button")).toBeTruthy();
    expect(getByTestId("email-signup-button")).toBeTruthy();
  });

  it("opens RegisterEmail modal on Email button press", async () => {
    const { getByTestId } = renderWithNavigation(<RegisterButtons />);
    fireEvent.press(getByTestId("email-signup-button"));

    await waitFor(() => {
      expect(getByTestId("register-email-modal")).toBeTruthy();
    });
  });

  it("opens GoogleAuth modal on Google button press", async () => {
    const { getByTestId } = renderWithNavigation(<RegisterButtons />);
    fireEvent.press(getByTestId("google-signup-button"));

    await waitFor(() => {
      expect(getByTestId("google-auth-modal")).toBeTruthy();
    });
  });

  it('logs a message when Facebook button is pressed', () => {
    const logSpy = jest.spyOn(console, 'log');
    const { getByTestId } = renderWithNavigation(<RegisterButtons />);

    fireEvent.press(getByTestId('facebook-signup-button'));
    expect(logSpy).toHaveBeenCalledWith("Facebook");
  });
});
