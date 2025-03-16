/**
 * @jest-environment node
 */
 /* eslint-disable */


import React from "react";
import { render, fireEvent, screen } from "@testing-library/react-native";
import { Field } from "@shared/types";
import RenderFields from "src/services/FieldComponent";

const mockHandleInputChange = jest.fn();

describe("RenderFields", () => {
  const fieldText: Field = { id: "text1", name: "Text Field", type: "text_field", values: [] };
  const fieldSelect: Field = { id: "select1", name: "Select Field", type: "select_field", values: [{ name: "Option 1", value: "1" }, { name: "Option 2", value: "2" }] };
  const fieldDate: Field = { id: "date1", name: "Date Field", type: "date", values: [] };
  const fieldHour: Field = { id: "hour1", name: "Hour Field", type: "hour", values: [] };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render a text field and allow input", () => {
    const { getByPlaceholderText } = render(
      <RenderFields field={fieldText} handleInputChange={mockHandleInputChange} />
    );

    const input = getByPlaceholderText("Enter Text Field");
    fireEvent.changeText(input, "Hello World");

    expect(input.props.value).toBe("Hello World");
    expect(mockHandleInputChange).toHaveBeenCalledWith("text1", "Hello World", true);
  });

  it("should render a date picker and allow date selection", () => {
    const { getByTestId } = render(
      <RenderFields field={fieldDate} handleInputChange={mockHandleInputChange} />
    );
    const datePicker = getByTestId("datetimepicker-date1");
    fireEvent(datePicker, "onChange", { type: "set", nativeEvent: { timestamp: new Date(2024, 0, 1).getTime() } });
    expect(mockHandleInputChange).toHaveBeenCalledWith("date1", new Date(2024, 0, 1).toString());
  });

  it("should render a time picker and allow time selection", () => {
    const { getByTestId } = render(
      <RenderFields field={fieldHour} handleInputChange={mockHandleInputChange} />
    );
    const timePicker = getByTestId("datetimepicker-hour1");
    fireEvent(timePicker, "onChange", { type: "set", nativeEvent: { timestamp: new Date(2024, 0, 1, 14, 30).getTime() } });
    expect(mockHandleInputChange).toHaveBeenCalledWith("hour", new Date(2024, 0, 1, 14, 30).toString());
  });

  it("should clear the text field when the clear button is pressed", () => {
    const { getByPlaceholderText, getByText } = render(
      <RenderFields field={fieldText} handleInputChange={mockHandleInputChange} />
    );

    const input = getByPlaceholderText("Enter Text Field");
    fireEvent.changeText(input, "Hello World");
    expect(mockHandleInputChange).toHaveBeenCalledWith("text1", "Hello World", true);

    const clearButton = screen.getByText("Clear");
    fireEvent.press(clearButton);
    expect(input.props.value).toBe("");
    expect(mockHandleInputChange).toHaveBeenCalledWith("text1", "");
  });

  it("should handle selection change for select field", () => {
    const { getByRole, getByText } = render(
      <RenderFields field={fieldSelect} handleInputChange={mockHandleInputChange} />
    );
  });

  it("should append value from the picker to the text input", () => {
    const { getByPlaceholderText, getByRole } = render(
      <RenderFields
        field={fieldText}
        handleInputChange={mockHandleInputChange}
        enrichments={[{ id: "enrich1", name: "Enrichment 1", description: "Description for Enrichment 1" }]}
      />
    );
    const input = getByPlaceholderText("Enter Text Field");
    fireEvent.changeText(input, "Hello");
  });
});
