/**
 * @jest-environment node
 */
 /* eslint-disable */


import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import ActionList from "src/services/actions/CreateActions";
import useApi from "src/hooks/useApi";
import useAccessToken from "src/hooks/useAccessToken";

jest.mock("src/hooks/useApi");
jest.mock("src/hooks/useAccessToken");

describe("ActionList Component - Fetch Service Data Conditions", () => {
  const mockOnClose = jest.fn();
  const mockOnActionPress = jest.fn();
  const mockSelectedImageId = "image123";
  const mockServiceData = {
    name: "Test Service",
    description: "This is a test service.",
    actions: [
      { id: "1", name: "Action 1", description: "Test Action 1", fields: [] },
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should not attempt to fetch data if api is missing", async () => {
    (useApi as jest.Mock).mockReturnValue(null);
    (useAccessToken as jest.Mock).mockReturnValue("test-access-token");

    const { queryByTestId } = render(
      <ActionList
        visible={true}
        onClose={mockOnClose}
        selectedImageId={mockSelectedImageId}
        onActionPress={mockOnActionPress}
      />
    );

    await waitFor(() => {
      expect(queryByTestId("loadingIndicator")).toBeNull();
      expect(queryByTestId("serviceName")).toBeNull();
      expect(queryByTestId("serviceDescription")).toBeNull();
    });
  });

  it("should not attempt to fetch data if accessToken is missing", async () => {
    (useApi as jest.Mock).mockReturnValue({
      services: { getById: jest.fn() },
    });
    (useAccessToken as jest.Mock).mockReturnValue(null);

    const { queryByTestId } = render(
      <ActionList
        visible={true}
        onClose={mockOnClose}
        selectedImageId={mockSelectedImageId}
        onActionPress={mockOnActionPress}
      />
    );

    await waitFor(() => {
      expect(queryByTestId("loadingIndicator")).toBeNull();
      expect(queryByTestId("serviceName")).toBeNull();
      expect(queryByTestId("serviceDescription")).toBeNull();
    });
  });

  it("should fetch data if api and accessToken are available", async () => {
    (useApi as jest.Mock).mockReturnValue({
      services: { getById: jest.fn().mockResolvedValue({ body: mockServiceData }) },
    });
    (useAccessToken as jest.Mock).mockReturnValue("test-access-token");

    const { getByTestId, queryByTestId } = render(
      <ActionList
        visible={true}
        onClose={mockOnClose}
        selectedImageId={mockSelectedImageId}
        onActionPress={mockOnActionPress}
      />
    );

    await waitFor(() => {
      expect(queryByTestId("loadingIndicator")).toBeNull();
      expect(getByTestId("serviceName").props.children).toBe(mockServiceData.name);
      expect(getByTestId("serviceDescription").props.children).toBe(mockServiceData.description);
    });
  });

  it("should trigger onActionPress when an action is selected", async () => {
    const { getByTestId } = render(
      <ActionList
        visible={true}
        onClose={mockOnClose}
        selectedImageId={mockSelectedImageId}
        onActionPress={mockOnActionPress}
      />
    );

    await waitFor(() => {
      fireEvent.press(getByTestId("actionButton-0"));
      expect(mockOnActionPress).toHaveBeenCalledWith({
        ...mockServiceData.actions[0],
        selectedImageId: mockSelectedImageId,
      });
    });
  });
});
