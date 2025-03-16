/**
 * @jest-environment node
 */
 /* eslint-disable */

import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import CreateReaction from "src/services/reactions/CreateReaction";
import useApi from "src/hooks/useApi";
import useAccessToken from "src/hooks/useAccessToken";

jest.mock("src/hooks/useApi");
jest.mock("src/hooks/useAccessToken");

describe("CreateReaction Component", () => {
  const mockOnClose = jest.fn();
  const mockOnActionPress = jest.fn();
  const mockImageMap = {
    service1: require("../../../assets/images/brandIcons/youtube.png"),
    service2: require("../../../assets/images/brandIcons/discord.png"),
  };

  beforeEach(() => {
    (useApi as jest.Mock).mockReturnValue({
      users: {
        getMe: jest.fn().mockResolvedValue({ body: { Oauth: { service1: true } } }),
      },
    });

    (useAccessToken as jest.Mock).mockReturnValue("mockAccessToken");
  });

  it("renders correctly when visible", () => {
    const { getByTestId } = render(
      <CreateReaction
        visible={true}
        onClose={mockOnClose}
        imageMap={mockImageMap}
        onActionPress={mockOnActionPress}
      />
    );
    expect(getByTestId("modalBackground")).toBeTruthy();
    expect(getByTestId("reactionTitle")).toBeTruthy();
    expect(getByTestId("buttonContainer")).toBeTruthy();
  });

  it("calls onClose when the modal background is pressed", () => {
    const { getByTestId } = render(
      <CreateReaction
        visible={true}
        onClose={mockOnClose}
        imageMap={mockImageMap}
        onActionPress={mockOnActionPress}
      />
    );

    fireEvent.press(getByTestId("modalBackground"));
    expect(mockOnClose).toHaveBeenCalled();
  });
});
