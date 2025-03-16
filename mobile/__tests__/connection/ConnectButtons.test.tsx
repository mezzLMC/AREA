/**
 * @jest-environment node
 */
 /* eslint-disable */


import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import ConnectButtons from "src/connection/ConnectButtons";

describe("ConnectButtons", () => {
  it("renders Sign In and Get Started buttons", () => {
    const { getByTestId } = render(
      <ConnectButtons onLoginPress={jest.fn()} onSignUpPress={jest.fn()} />
    );

    expect(getByTestId("sign-in-button")).toBeTruthy();
    expect(getByTestId("get-started-button")).toBeTruthy();
  });

  it("calls onLoginPress when Sign In is pressed", async () => {
    const onLoginPressMock = jest.fn();
    const { getByTestId } = render(
      <ConnectButtons onLoginPress={onLoginPressMock} onSignUpPress={jest.fn()} />
    );

    fireEvent.press(getByTestId("sign-in-button"));

    await waitFor(() => {
      expect(onLoginPressMock).toHaveBeenCalled();
    });
  });

  it("calls onSignUpPress when Get Started is pressed", async () => {
    const onSignUpPressMock = jest.fn();
    const { getByTestId } = render(
      <ConnectButtons onLoginPress={jest.fn()} onSignUpPress={onSignUpPressMock} />
    );

    fireEvent.press(getByTestId("get-started-button"));

    await waitFor(() => {
      expect(onSignUpPressMock).toHaveBeenCalled();
    });
  });
});
