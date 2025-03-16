/**
 * @jest-environment node
 */
 /* eslint-disable */

import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Modal,
  Text,
  Image,
  TouchableWithoutFeedback,
  ActivityIndicator,
  TouchableOpacity,
  ImageSourcePropType,
} from "react-native";
import imageMap from "src/components/ImageLoader";
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

type Reaction = {
  description: string;
  name: string;
  id: string;
  fields: { name: string; type: string }[];
};

type SubmissionData = {
  formData: { [key: string]: string };
  selectedDate: Date | undefined;
  selectedTime: Date | undefined;
  actionId: string | undefined;
  selectedImage: string;
};

type Props = {
  visible: boolean;
  onClose: () => void;
  submissionData: SubmissionData | null;
  onSubmit: (data: { action: SubmissionData | null; selectedReaction: Reaction }) => void;
  testID? : string;
};

type ServiceData = {
  name: string;
  description: string;
  reactions: Reaction[];
};

const ReactionList = ({ visible, onClose, submissionData, onSubmit, testID }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [serviceData, setServiceData] = useState<ServiceData | null>(null);
  const accessToken = useAccessToken();
  const api = useApi();

  const fetchServiceData = async (serviceId: string) => {
    setLoading(true);
    try {
      if (!api || !accessToken) return;
      const { body } = await api.services.getById(serviceId, accessToken);
      setServiceData(body);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!submissionData) return;
    fetchServiceData(submissionData.selectedImage);
  }, [submissionData]);

  const handleReactionPress = (reaction: Reaction) => {
    const sendData = {
      action: submissionData,
      selectedReaction: reaction,
    };
    onSubmit(sendData);
  };

  return (
    <Modal transparent={true} animationType="none" visible={visible}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalBackground} testID="modalBackground">
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer} testID="modalContainer">
              {loading && <ActivityIndicator size="large" color="#FFFFFF" testID="loadingIndicator" />}
              {!loading && serviceData && (
                <View style={styles.componentContainer}>
                  {submissionData?.selectedImage && imageMap[submissionData.selectedImage] && (
                    <Image source={imageMap[submissionData?.selectedImage]} style={styles.iconStyle} testID="serviceIcon" />
                  )}
                  <Text style={styles.title} testID="serviceTitle">{serviceData.name}</Text>
                  <Text style={styles.description} testID="serviceDescription">{serviceData.description}</Text>
                  {serviceData.reactions.map((reaction: Reaction, index: number) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.actionButton}
                      onPress={() => handleReactionPress(reaction)}
                      testID={`reactionButton_${reaction.id}`} // testID unique pour chaque bouton de réaction
                    >
                      <Text style={styles.actionButtonText}>{reaction.description}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ReactionList;