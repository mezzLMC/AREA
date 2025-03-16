/**
 * @jest-environment node
 */
 /* eslint-disable */


import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import Fields from "src/services/actions/fields";

describe("Fields Component", () => {
  const mockOnClose = jest.fn();
  const mockOnSubmit = jest.fn();
  const mockSelectedAction = {
    id: "action123",
    name: "Sample Action",
    description: "This is a sample action description.",
    selectedImageId: "image123",
    fields: [{ name: "Field1", type: "text" }],
    enrichments: [],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should display action details when visible", () => {
    const { getByTestId } = render(
      <Fields visible={true} onClose={mockOnClose} selectedAction={mockSelectedAction} onSubmit={mockOnSubmit} />
    );
    expect(getByTestId("fieldsModal")).toBeTruthy();
    expect(getByTestId("actionName").props.children).toBe(mockSelectedAction.name);
    expect(getByTestId("actionDescription").props.children).toBe(mockSelectedAction.description);
    expect(getByTestId("actionIcon")).toBeTruthy();
  });

  it("should call onClose when clicking outside the modal", () => {
    const { getByTestId } = render(
      <Fields visible={true} onClose={mockOnClose} selectedAction={mockSelectedAction} onSubmit={mockOnSubmit} />
    );
    fireEvent.press(getByTestId("closeBackdrop"));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it("should call onSubmit with correct data when submit button is pressed", async () => {
    const { getByTestId } = render(
      <Fields visible={true} onClose={mockOnClose} selectedAction={mockSelectedAction} onSubmit={mockOnSubmit} />
    );

    fireEvent.press(getByTestId("submitButton"));
    await waitFor(() => expect(mockOnSubmit).toHaveBeenCalledWith({
      actionId: mockSelectedAction.id,
      formData: {"undefined": "",},
      actionName: mockSelectedAction.selectedImageId,
      enrichments: mockSelectedAction.enrichments,
    }));
  });
});
