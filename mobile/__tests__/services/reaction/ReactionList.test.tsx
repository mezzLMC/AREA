import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import ReactionList from "src/services/reactions/ReactionList";
import useApi from "src/hooks/useApi";
import useAccessToken from "src/hooks/useAccessToken";

jest.mock("src/hooks/useApi");
jest.mock("src/hooks/useAccessToken");

describe("ReactionList Component", () => {
  const mockOnClose = jest.fn();
  const mockOnSubmit = jest.fn();
  const mockSubmissionData = {
    formData: {},
    selectedDate: undefined,
    selectedTime: undefined,
    actionId: undefined,
    selectedImage: "service1",
  };

  beforeEach(() => {
    (useApi as jest.Mock).mockReturnValue({
      services: {
        getById: jest.fn().mockResolvedValue({
          body: {
            name: "Service 1",
            description: "This is a test service.",
            reactions: [
              { id: "reaction1", description: "Like", name: "Like", fields: [] },
              { id: "reaction2", description: "Love", name: "Love", fields: [] },
            ],
          },
        }),
      },
    });

    (useAccessToken as jest.Mock).mockReturnValue("mockAccessToken");
  });

  it("renders correctly when visible", async () => {
    const { getByTestId } = render(
      <ReactionList visible={true} onClose={mockOnClose} submissionData={mockSubmissionData} onSubmit={mockOnSubmit} />
    );

    expect(getByTestId("modalBackground")).toBeTruthy();
    await waitFor(() => {
      expect(getByTestId("serviceTitle")).toHaveTextContent("Service 1");
      expect(getByTestId("serviceDescription")).toHaveTextContent("This is a test service.");
    });
  });

  it("calls onClose when the modal background is pressed", () => {
    const { getByTestId } = render(
      <ReactionList visible={true} onClose={mockOnClose} submissionData={mockSubmissionData} onSubmit={mockOnSubmit} />
    );

    fireEvent.press(getByTestId("modalBackground"));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it("calls onSubmit with the correct data when a reaction is pressed", async () => {
    const { getByTestId } = render(
      <ReactionList visible={true} onClose={mockOnClose} submissionData={mockSubmissionData} onSubmit={mockOnSubmit} />
    );
    await waitFor(() => {
      expect(getByTestId("serviceTitle")).toHaveTextContent("Service 1");
    });
    fireEvent.press(getByTestId("reactionButton_reaction1"));
    expect(mockOnSubmit).toHaveBeenCalledWith({
      action: mockSubmissionData,
      selectedReaction: { id: "reaction1", description: "Like", name: "Like", fields: [] },
    });
  });

  it("shows loading indicator while fetching data", async () => {
    const { getByTestId, queryByTestId } = render(
      <ReactionList visible={true} onClose={mockOnClose} submissionData={mockSubmissionData} onSubmit={mockOnSubmit} />
    );
    expect(getByTestId("loadingIndicator")).toBeTruthy();
    await waitFor(() => {
      expect(queryByTestId("loadingIndicator")).toBeNull();
    });
  });

  it("does not fetch service data if api or accessToken are missing", async () => {
    const mockGetById = jest.fn();
    (useApi as jest.Mock).mockReturnValue({
      services: {
        getById: mockGetById,
      },
    });
    (useAccessToken as jest.Mock).mockReturnValue(null);
    render(
      <ReactionList visible={true} onClose={mockOnClose} submissionData={mockSubmissionData} onSubmit={mockOnSubmit} />
    );
    await waitFor(() => {
      expect(mockGetById).not.toHaveBeenCalled();
    });
  });

  it("does not fetch service data if submissionData is missing", async () => {
    const { rerender } = render(
      <ReactionList visible={true} onClose={mockOnClose} submissionData={null} onSubmit={mockOnSubmit} />
    );
    await waitFor(() => {
      const api = useApi();
      expect(api?.services.getById).not.toHaveBeenCalled();
    });
    rerender(
      <ReactionList visible={true} onClose={mockOnClose} submissionData={mockSubmissionData} onSubmit={mockOnSubmit} />
    );
    await waitFor(() => {
      const api = useApi();
      expect(api?.services.getById).toHaveBeenCalled();
    });
  });
});
