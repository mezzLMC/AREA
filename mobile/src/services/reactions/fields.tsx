/**
 * @jest-environment node
 */
 /* eslint-disable */

import React, { useState, useEffect } from "react";
import { Modal, View, Text, TouchableWithoutFeedback, TouchableOpacity, Image, StyleSheet, KeyboardAvoidingView, Keyboard} from "react-native";
import useApi from "src/hooks/useApi";
import useAccessToken from "src/hooks/useAccessToken";
import imageMap from "src/components/ImageLoader";
import { AreaPayload } from "@shared/Api";
import RenderFields from "../FieldComponent";
import { Field } from "@shared/types";

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    height: "75%",
    padding: 15,
    backgroundColor: "#16161A",
    borderRadius: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "500",
    marginTop: 30,
    color: "white",
    textAlign: "center",
  },
  componentContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
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
  submitButton: {
    backgroundColor: "#EDB9FF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  iconStyle: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    height: 70,
    width: 70,
    marginBottom: 20,
  },
  label: {
    color: "#FFFFFF",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "500",
  },
  description: {
    color: "#FFFFFF",
    marginTop: 35,
    fontSize: 16,
    fontWeight: "400",
  },
});

interface FieldsProps {
  visible: boolean;
  onClose: () => void;
  selectedAction: {
    action: {
      action: {
        actionId: string;
        actionName: string;
        formData: any;
        enrichments: any;
      };
      selectedImage: string;
    };
    selectedReaction: {
      id: string;
      name: string;
      description: string;
      fields: Field[];
    };
  };
testID?: string;
}

const Fields: React.FC<FieldsProps> = ({ visible, onClose, selectedAction, testID }) => {
  const [formData, setFormData] = useState<{ [key: string]: any }>({});
  const [textInputValues, setTextInputValues] = useState<{ [key: string]: string }>({});
  const accessToken = useAccessToken();
  const api = useApi();
  const [keyboardOffset, setKeyboardOffset] = useState(0);

  const handleInputChange = (fieldName: string, value: string, append: boolean = false) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: append && prevData[fieldName] ? (prevData[fieldName] as string) + " " + value : value,
    }));
  };

  const handleTextInputChange = (fieldId: string, value: string) => {
    setTextInputValues((prevValues) => ({
      ...prevValues,
      [fieldId]: value,
    }));
    handleInputChange(fieldId, value);
  };

  const handleSubmit = async () => {
    const action = {
      id: selectedAction.action?.action?.actionId,
      service: selectedAction.action?.action?.actionName,
      fields: selectedAction.action?.action?.formData,
    };

    const reaction: AreaPayload = {
      id: selectedAction?.selectedReaction.id,
      service: selectedAction.action?.selectedImage,
      fields: { ...formData, ...textInputValues },
    };

    if (!api || !accessToken) return;
    await api.services.sendService(action, reaction, accessToken);
    onClose();
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", (e) => {
      setKeyboardOffset(0);
    });
    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardOffset(0);
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <Modal transparent={true} animationType="none" visible={visible}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalBackground} testID="modalBackground">
          <TouchableWithoutFeedback>
            <KeyboardAvoidingView style={[styles.modalContainer, { marginBottom: keyboardOffset }]} behavior="padding" testID="keyboardAvoidingView">
              <View style={styles.componentContainer} testID="componentContainer">
                {imageMap[selectedAction?.action?.selectedImage] && (
                  <Image source={imageMap[selectedAction?.action?.selectedImage]} style={styles.iconStyle} testID="actionIcon" />
                )}
                <Text style={styles.title} testID="actionTitle">{selectedAction?.selectedReaction.name}</Text>
                <Text style={styles.description} testID="actionDescription">{selectedAction?.selectedReaction.description}</Text>
                {Array.isArray(selectedAction?.selectedReaction?.fields) && selectedAction.selectedReaction.fields.map((field: Field, index: number) => (
                  <RenderFields
                    key={index}
                    field={field}
                    handleInputChange={handleTextInputChange}
                    textInputValue={textInputValues[field.id]}
                    enrichments={selectedAction?.action?.action?.enrichments}
                    testID={`renderField_${field.id}`}
                  />
                ))}
                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} testID="submitButton">
                  <Text>Submit</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default Fields;