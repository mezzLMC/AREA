/**
 * @jest-environment node
 */
 /* eslint-disable */


import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Fields from "src/services/reactions/fields";
import { Field } from "@shared/types";
describe("Fields Component", () => {
    const mockOnClose = jest.fn();
    const mockSelectedAction = {
        action: {
          action: {
            actionId: "action123",
            actionName: "Test Service",
            formData: {},
            enrichments: [],
          },
          selectedImage: "imageKey",
        },
        selectedReaction: {
          id: "reaction123",
          name: "Test Action",
          description: "This is a test action.",
          fields: [
            {
              id: "field1",
              name: "Field 1",
              type: "text_field",
            },
            {
              id: "field2",
              name: "Field 2",
              type: "select_field",
              values: [
                { name: "Option 1", value: "value1" },
                { name: "Option 2", value: "value2" },
              ],
            },
            {
              id: "field3",
              name: "Field 3",
              type: "date",
            },
          ] as Field[],
        },
      };

    beforeEach(() => {
      jest.clearAllMocks();
    });
    it("should display the modal with action details", () => {
      const { getByTestId } = render(
        <Fields visible={true} onClose={mockOnClose} selectedAction={mockSelectedAction} />
      );
    expect(getByTestId("modalBackground")).toBeTruthy();
    expect(getByTestId("actionTitle").props.children).toBe(mockSelectedAction.selectedReaction.name);
    expect(getByTestId("actionDescription").props.children).toBe(mockSelectedAction.selectedReaction.description);
  });

  it("should call onClose when tapping outside the modal", () => {
    const { getByTestId } = render(
      <Fields visible={true} onClose={mockOnClose} selectedAction={mockSelectedAction} />
    );

    fireEvent.press(getByTestId("modalBackground"));
    expect(mockOnClose).toHaveBeenCalled();
  });
});
