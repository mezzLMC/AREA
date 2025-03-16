/**
 * @jest-environment node
 */
 /* eslint-disable */

import React from "react";
import { Modal, View, Text, TouchableWithoutFeedback, TouchableOpacity, Image, StyleSheet } from "react-native";
import useApi from "src/hooks/useApi";
import useAccessToken from "src/hooks/useAccessToken";

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    top: -20,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    height: "75%",
    padding: 20,
    backgroundColor: "#16161A",
    borderRadius: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "500",
    marginTop: 30,
    color: "white",
    textAlign: "center",
  },
  buttonActionApp: {
    borderRadius: 10,
    height: 70,
    width: 70,
    margin: 10,
    marginBottom: 40,
    marginLeft: 50,
  },
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
    width: "100%",
  },
});

type SubmissionData = {
  formData: { [key: string]: string };
  selectedDate: Date | undefined;
  selectedTime: Date | undefined;
  actionId: string | undefined;
};

type Props = {
  visible: boolean;
  onClose: () => void;
  imageMap: Record<string, any>;
  onActionPress: (data: any) => void;
  submissionData?: SubmissionData;
  testID? : string;
};

const CreateReaction = ({ visible, onClose, imageMap, onActionPress, submissionData, testID }: Props) => {
  const api = useApi();
  const accessToken = useAccessToken();

  const checkServiceAuth = async (service: string) => {
    if (!api || !accessToken) return false;
    try {
      const { body } = await api.users.getMe(accessToken);
      return body.Oauth ? !!body.Oauth[service] : true;
    } catch (error) {
      return false;
    }
  };

  const handleSubmit = async (key: string) => {
    const isAuth = await checkServiceAuth(key);
    if (isAuth) {
      const sendData = {
        action: submissionData,
        selectedImage: key,
      };
      onActionPress(sendData);
    } else {
      alert(`You are not authenticated with ${key}. Please connect first in settings.`);
    }
  };

  return (
    <Modal transparent={true} animationType="none" visible={visible}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalBackground} testID="modalBackground">
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer} testID="modalContainer">
              <Text style={styles.title} testID="reactionTitle">
                Choose your <Text style={{ color: "#EDB9FF" }}>Reaction</Text>
              </Text>
              <View style={styles.buttonContainer} testID="buttonContainer">
                {Object.keys(imageMap).map((key) => (
                  <TouchableOpacity key={key} onPress={() => handleSubmit(key)} testID={`reactionButton_${key}`}>
                    <Image source={imageMap[key]} style={styles.buttonActionApp} />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CreateReaction;