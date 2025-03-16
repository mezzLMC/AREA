/**
 * @jest-environment node
 */
 /* eslint-disable */

import React, { useState } from "react";
import { StyleSheet, View, Modal, Text, TouchableWithoutFeedback, TouchableOpacity, Image } from "react-native";
import { AReaInfo } from "@shared/types";
import useApi from "src/hooks/useApi";
import useAccessToken from "src/hooks/useAccessToken";
import imageMap from "src/components/ImageLoader";
import ActionList from "./actions/CreateActions";
import ActionField from "./actions/fields";
import ReactionField from "./reactions/fields";
import ReactionList from "./reactions/ReactionList";
import ReactionApp from "./reactions/CreateReaction";

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
    marginTop: 50,
    width: "100%",
  },
  helloText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginTop: 20,
  },
  componentContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  actionButton: {
    top: 70,
    backgroundColor: "#282828",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    width: "80%",
    alignItems: "center",
  },
  actionButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  description: {
    color: "#FFFFFF",
    marginTop: 20,
    fontSize: 16,
    top: 40,
    fontWeight: "400",
  },
  iconStyle: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    height: 70,
    width: 70,
    top: 20,
  },
});

type Props = {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
};

const CreateServices = ({ modalVisible, setModalVisible }: Props) => {
  const [actionListVisible, setActionListVisible] = useState(false);
  const [thirdModalVisible, setThirdModalVisible] = useState(false);
  const [fourthModalVisible, setFourthModalVisible] = useState(false);
  const [fifthModalVisible, setFifthModalVisible] = useState(false);
  const [sixthModalVisible, setSixthModalVisible] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState<AReaInfo | null>(null);
  const [selectedAction, setSelectedAction] = useState<any>(null);
  const [submissionData, setSubmissionData] = useState<any>(null);
  const [SendData, setSendData] = useState<any>(null);
  const [ReactionData, setReactionData] = useState<any>(null);
  const api = useApi();
  const accessToken = useAccessToken();
  const handleFirstModalClose = () => setModalVisible(false);

  const checkServiceAuth = async (service: string) => {
    if (!api || !accessToken) return false;
    try {
      if (service === "teams") service = "microsoft";
      const { body } = await api.users.getMe(accessToken);
      if (!body.Oauth) return true;
      return body.Oauth[service] ? true : false;
    } catch (error) {
      return false;
    }
  };

  const handleActionListOpen = async (service: string) => {
    const isAuth = await checkServiceAuth(service);
    if (isAuth) {
      setModalVisible(false);
      setSelectedImageId({ id: service } as AReaInfo);
      setActionListVisible(true);
    } else alert(`You are not authenticated with ${service}. Please connect first in settings.`);
  };

  const handleActionListClose = () => setActionListVisible(false);

  const handleActionSelect = (action: any) => {
    setSelectedAction(action);
    setActionListVisible(false);
    setThirdModalVisible(true);
  };

  const handleThirdModalClose = () => setThirdModalVisible(false);
  const handleFourthModalClose = () => setFourthModalVisible(false);
  const handleFifthModalClose = () => setFifthModalVisible(false);
  const handleSixthModalClose = () => setSixthModalVisible(false);

  const openFourthModal = (data: any) => {
    setSubmissionData(data);
    setThirdModalVisible(false);
    setFourthModalVisible(true);
  };

  const openFifthModal = (data: any) => {
    setSendData(data);
    setFourthModalVisible(false);
    setFifthModalVisible(true);
  };

  const openSixthModal = (data: any) => {
    setReactionData(data);
    setFifthModalVisible(false);
    setSixthModalVisible(true);
  };

  return (
    <View>
      <Modal transparent={true} animationType="none" visible={modalVisible}>
        <TouchableWithoutFeedback onPress={handleFirstModalClose}>
          <View style={styles.modalBackground}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContainer} testID="create-services-modal-container">
                <Text style={styles.title} testID="create-services-title">
                  Choose your <Text style={{ color: "#EDB9FF" }}>Action</Text>
                </Text>
                <View style={styles.buttonContainer} testID="create-services-button-container">
                  {Object.keys(imageMap).map((key) => (
                    <TouchableOpacity
                      key={key}
                      onPress={() => handleActionListOpen(key)}
                      testID={`create-services-button-${key}`}
                    >
                      <Image
                        source={imageMap[key]}
                        style={styles.buttonActionApp}
                        testID={`create-services-image-${key}`}
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <ActionList
        visible={actionListVisible}
        onClose={handleActionListClose}
        selectedImageId={selectedImageId ? selectedImageId.id : ''}
        onActionPress={handleActionSelect}
        testID="create-services-action-list"
      />
      <ActionField
        visible={thirdModalVisible}
        onClose={handleThirdModalClose}
        selectedAction={selectedAction}
        onSubmit={openFourthModal}
        testID="create-services-action-field"
      />
      <ReactionApp
        visible={fourthModalVisible}
        onClose={handleFourthModalClose}
        imageMap={imageMap}
        onActionPress={openFifthModal}
        submissionData={submissionData}
        testID="create-services-reaction-app"
      />
      <ReactionList
        visible={fifthModalVisible}
        onClose={handleFifthModalClose}
        submissionData={SendData}
        onSubmit={openSixthModal}
        testID="create-services-reaction-list"
      />
      <ReactionField
        visible={sixthModalVisible}
        onClose={handleSixthModalClose}
        selectedAction={ReactionData}
        testID="create-services-reaction-field"
      />
    </View>
  );
};

export default CreateServices;