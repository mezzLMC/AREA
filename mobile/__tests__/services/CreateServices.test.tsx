/**
 * @jest-environment node
 */
 /* eslint-disable */


import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react-native";
import CreateServices from "src/services/CreateServices";
import useApi from "src/hooks/useApi";
import useAccessToken from "src/hooks/useAccessToken";

jest.mock("src/hooks/useApi");
jest.mock("src/hooks/useAccessToken");

const mockApi = {
  users: {
    getMe: jest.fn().mockResolvedValue({ body: { Oauth: { spotify: true } } }),
  },
};
(useApi as jest.Mock).mockReturnValue(mockApi);
(useAccessToken as jest.Mock).mockReturnValue("mock-access-token");

describe("CreateServices Component", () => {
  it("displays the modal when modalVisible is true", () => {
    const { getByTestId } = render(
      <CreateServices modalVisible={true} setModalVisible={jest.fn()} />
    );

    const modalContainer = getByTestId("create-services-modal-container");
    const title = getByTestId("create-services-title");

    expect(modalContainer).toBeTruthy();
    expect(title).toHaveTextContent("Choose your Action");
  });

  it("closes the modal when handleFirstModalClose is called", () => {
    const setModalVisible = jest.fn();
    const { getByTestId } = render(
      <CreateServices modalVisible={true} setModalVisible={setModalVisible} />
    );

    fireEvent.press(getByTestId("create-services-modal-container"));

    expect(setModalVisible).toHaveBeenCalledWith(false);
  });

  it("checks service authentication and opens action list if authenticated", async () => {
    const setModalVisible = jest.fn();
    mockApi.users.getMe.mockResolvedValueOnce({ body: { Oauth: { spotify: true } } });
    const { getByTestId } = render(
      <CreateServices modalVisible={true} setModalVisible={setModalVisible} />
    );
    const actionListButton = getByTestId(`create-services-button-spotify`);
  });

  it("selects an action and opens the third modal", async () => {
    const setModalVisible = jest.fn();
    const { getByTestId } = render(
      <CreateServices modalVisible={true} setModalVisible={setModalVisible} />
    );

    const service = "spotify";
    const actionListButton = getByTestId(`create-services-button-${service}`);
  });
});
