/**
 * @jest-environment node
 */
 /* eslint-disable */


import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import ConnectionScreen from "../../src/connection/page";

describe("ConnectionScreen", () => {
  beforeEach(() => {
    jest.useFakeTimers();
   });

  it("renders correctly", () => {
    const { getByTestId } = render(<ConnectionScreen />);
    expect(getByTestId("background")).toBeTruthy();
  });

  it("displays the title correctly", () => {
    const { getByTestId } = render(<ConnectionScreen />);
    const title = getByTestId("title");
    expect(title).toHaveTextContent("AREA");
  });

  it("renders two particles images", () => {
    const { getByTestId } = render(<ConnectionScreen />);
    const particles1 = getByTestId('particles1');
    const particles2 = getByTestId('particles2');
    expect(particles1).toBeTruthy();
    expect(particles2).toBeTruthy();
  });

  it("shows new buttons when login button is pressed", async () => {
    const { getByTestId, queryByTestId } = render(<ConnectionScreen />);
    expect(queryByTestId("loginButtonsContainer")).toBeNull();
    fireEvent.press(getByTestId("connectButtons"));
    jest.advanceTimersByTime(500);
  });

  it("shows register buttons when sign up button is pressed", async () => {
    const { getByTestId, queryByTestId } = render(<ConnectionScreen />);
    expect(queryByTestId("registerButtonsContainer")).toBeNull();
    fireEvent.press(getByTestId("connectButtons"));
    jest.advanceTimersByTime(500);
  });
});
