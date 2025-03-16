/**
 * @jest-environment node
 */
 /* eslint-disable */


import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import RNPickerSelect from "react-native-picker-select";
import { Field } from "@shared/types";
import { Enrichment } from "@shared/services/types";

const styles = StyleSheet.create({
  fieldContainer: {
    marginBottom: 35,
    alignItems: "center",
    width: "100%",
  },
  fieldText: {
    color: "#FFFFFF",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 12,
    fontWeight: "500",
  },
  label: {
    color: "#FFFFFF",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "500",
  },
  textFields: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 10,
    color: "white",
    width: "100%",
    maxWidth: 250,
    overflow: "hidden",
  },
  pickerClearContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    width: "100%",
    maxWidth: 250,
  },
  selectContainer: {
    width: "100%",
    maxWidth: 250,
    backgroundColor: "#292929",
    borderRadius: 5,
    overflow: "hidden",
  },
  clearButton: {
    backgroundColor: "#FF6B6B",
    padding: 8,
    borderRadius: 5,
    justifyContent: "center",
  },
  clearButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 12,
  },
});

interface RenderFieldProps {
  field: Field;
  handleInputChange: (fieldName: string, value: string, append?: boolean) => void;
  enrichments?: Enrichment[];
  testID?: string;
  textInputValue?: any;
}

const RenderFields = ({ field, handleInputChange, enrichments, testID }: RenderFieldProps) => {
  const [textInputValue, setTextInputValue] = useState("");
  const textInputRef = useRef<TextInput>(null);
  const [selectedValue, setSelectedValue] = useState("");

  useEffect(() => {
    handleInputChange(field.id, textInputValue, true);
  }, [textInputValue]);

  const clearField = (fieldName: string) => {
    setTextInputValue("");
    handleInputChange(fieldName, "");
  };

  if (field.type === "hour") {
    return (
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldText}>Select Hour:</Text>
        <DateTimePicker
          testID="datetimepicker-hour1"
          value={new Date()}
          mode="time"
          display="default"
          onChange={(event, time) => time && handleInputChange("hour", time.toString())}
        />
      </View>
    );
  }

  if (field.type === "date") {
    return (
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldText}>Select Date:</Text>
        <DateTimePicker
          testID="datetimepicker-date1"
          style={{ marginBottom: 30 }}
          value={new Date()}
          mode="date"
          display="default"
          onChange={(event, date) => date && handleInputChange(field.id, date.toString())}
        />
      </View>
    );
  }

  if (field.type === "select_field") {
    return (
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>{field.name}</Text>
        <View style={styles.selectContainer}>
          <RNPickerSelect
            onValueChange={(value) => {
              setSelectedValue(value);
              handleInputChange(field.id, value);
            }}
            items={(field.values ?? []).map((item) => ({
              label: item.name,
              value: item.value,
            }))}
            placeholder={{ label: "Select an option...", value: "" }}
            style={{
              inputIOS: {
                height: 40,
                color: "white",
                paddingHorizontal: 10,
                backgroundColor: "#292929",
                borderRadius: 5,
                textAlign: "center",
              },
              inputAndroid: {
                height: 40,
                color: "white",
                paddingHorizontal: 10,
                backgroundColor: "#292929",
                borderRadius: 5,
                textAlign: "center",
              },
            }}
            value={selectedValue}
          />
        </View>
      </View>
    );
  }

  if (field.type === "text_field") {
    return (
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>{field.name}</Text>
        <TextInput
          ref={textInputRef}
          style={styles.textFields}
          placeholder={`Enter ${field.name}`}
          placeholderTextColor="#888"
          onChangeText={(text) => setTextInputValue(text)}
          value={textInputValue}
          onBlur={() => handleInputChange(field.id, textInputValue, true)}
        />
        <View style={styles.pickerClearContainer}>
          <RNPickerSelect
            onValueChange={(value) => {
              textInputRef.current?.focus();
              setTextInputValue((prev) => prev + value);
            }}
            items={[
              ...(enrichments ?? []).map((enrichment) => ({
                label: enrichment.name,
                value: `{{${enrichment.id}}}`,
              })),
            ]}
            placeholder={{ label: "Select an option...", value: "" }}
            style={{
              inputIOS: {
                height: 40,
                color: "white",
                paddingHorizontal: 10,
                backgroundColor: "#1D1D1D",
                borderRadius: 5,
                marginRight: 8,
              },
              inputAndroid: {
                height: 40,
                color: "white",
                paddingHorizontal: 10,
                backgroundColor: "#1D1D1D",
                borderRadius: 5,
                marginRight: 8,
              },
            }}
          />
          <TouchableOpacity style={styles.clearButton} onPress={() => clearField(field.id)}>
            <Text style={styles.clearButtonText}>Clear</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return null;
};

export default RenderFields;