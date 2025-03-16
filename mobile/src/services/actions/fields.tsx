/**
 * @jest-environment node
 */
 /* eslint-disable */

import React, { useState, useEffect, useRef } from "react";
import {Modal,View,Text,TouchableWithoutFeedback,TouchableOpacity,Image,StyleSheet,Keyboard,} from "react-native";
import imageMap from "src/components/ImageLoader";
import RenderFields from "../FieldComponent";

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
  submitButtonText: {
    fontWeight: "500",
    width: 70,
    fontSize: 16,
    textAlign: "center",
    alignItems: "center",
  },
});

type Enrichment = { id: string; name: string; type: string; description: string };
type ServiceData = { name: string; description: string; id: string; fields: any; enrichments: Enrichment[]; selectedImageId: string };
type Props = { visible: boolean; onClose: () => void; selectedAction: ServiceData; onSubmit: (data: any) => void; testID?: string };

const Fields = ({ visible, onClose, selectedAction, onSubmit, testID }: Props) => {
  const [keyboardOffset, setKeyboardOffset] = useState(0);
  const [formData, setFormData] = useState<{ [key: string]: string }>({});

  const handleInputChange = (fieldName: string, value: string, append: boolean = false) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: append && prevData[fieldName] ? prevData[fieldName] + " " + value : value,
    }));
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", (e) => setKeyboardOffset(0));
    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => setKeyboardOffset(0));
    return () => { keyboardDidHideListener.remove(); keyboardDidShowListener.remove(); };
  }, []);

  const handleSubmit = () => onSubmit({ actionId: selectedAction?.id, formData, actionName: selectedAction?.selectedImageId, enrichments: selectedAction?.enrichments });

  return (
    <Modal transparent={true} animationType="none" visible={visible} testID="fieldsModal">
      <TouchableWithoutFeedback onPress={onClose} testID="closeBackdrop">
        <View style={styles.modalBackground}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer} testID="modalContainer">
              <Text style={styles.title} testID="actionName">{selectedAction?.name}</Text>
              <Image source={imageMap[selectedAction?.selectedImageId]} style={styles.iconStyle} testID="actionIcon" />
              <Text style={styles.description} testID="actionDescription">{selectedAction?.description}</Text>
              {selectedAction?.fields?.map((field: any, index: number) => (
                <RenderFields key={index} field={field} handleInputChange={handleInputChange} enrichments={selectedAction?.enrichments} testID={`field-${index}`} />
              ))}
              <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} testID="submitButton">
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default Fields;