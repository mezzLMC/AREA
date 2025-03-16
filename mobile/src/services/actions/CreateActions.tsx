/**
 * @jest-environment node
 */
 /* eslint-disable */

import React, { useEffect, useState } from "react";
import { StyleSheet, View, Modal, Text, Image, TouchableWithoutFeedback, ActivityIndicator, TouchableOpacity} from "react-native";
import useApi from "src/hooks/useApi";
import imageMap from "src/components/ImageLoader";
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

type Action = {
  description: string;
  name: string;
  id: string;
  fields: { name: string; type: string }[];
};

type Props = {
  visible: boolean;
  onClose: () => void;
  selectedImageId: string;
  onActionPress: (action: Action & { selectedImageId: string }) => void;
  testID? : string;
};

type ServiceData = {
  name: string;
  description: string;
  actions: Action[];
};

const ActionList = ({ visible, onClose, selectedImageId, onActionPress, testID }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [serviceData, setServiceData] = useState<ServiceData | null>(null);
  const accessToken = useAccessToken();
  const api = useApi();

  const fetchServiceData = async (serviceId: string) => {
    setLoading(true);
    try {
      if (!api || !accessToken) return;
      const { body } = await api.services.getById(serviceId, accessToken);
      setServiceData({ ...body });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedImageId) fetchServiceData(selectedImageId);
  }, [selectedImageId]);

  return (
    <Modal transparent={true} animationType="none" visible={visible} testID="modal">
      <TouchableWithoutFeedback onPress={onClose} testID="closeBackdrop">
        <View style={styles.modalBackground}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer} testID="modalContainer">
              {loading && <ActivityIndicator size="large" color="#FFFFFF" testID="loadingIndicator" />}
              {!loading && serviceData && serviceData.actions && (
                <View style={styles.componentContainer} testID="actionListContainer">
                  <Image source={imageMap[selectedImageId]} style={styles.iconStyle} testID="actionIcon" />
                  <Text style={styles.title} testID="serviceName">{serviceData.name}</Text>
                  <Text style={styles.description} testID="serviceDescription">{serviceData.description}</Text>
                  {serviceData.actions.map((action, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.actionButton}
                      onPress={() => onActionPress({ ...action, selectedImageId })}
                      testID={`actionButton-${index}`}
                    >
                      <Text style={styles.actionButtonText} testID={`actionText-${index}`}>
                        {action.description}
                      </Text>
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

export default ActionList;