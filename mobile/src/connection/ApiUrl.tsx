import React, { useState, useEffect } from "react";
import { StyleSheet, View, Modal, Text, TouchableOpacity, TouchableWithoutFeedback, TextInput } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { storeApiUrl, getApiUrl } from "src/LocalStorage";

const styles = StyleSheet.create({
  iconButton: {
    position: "absolute",
    top: -420,
    right: -160,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    elevation: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    width: "100%",
    marginBottom: 20,
  },
});

const ApiUrl = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [apiUrl, setApiUrl] = useState("http://10.74.252.167:8080/api");

  useEffect(() => {
    const loadApiUrl = async () => {
      const storedUrl = await getApiUrl();
      if (storedUrl) {
        setApiUrl(storedUrl);
      }
    };
    loadApiUrl();
  }, []);

  const handleIconPress = () => setModalVisible(true);
  const handleBackgroundPress = () => setModalVisible(false);

  const handleSavePress = async () => {
    await storeApiUrl(apiUrl);
    setModalVisible(false);
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.iconButton}
        onPress={handleIconPress}
        testID="settings-icon"
      >
        <Icon name="gear" size={30} color="#36363d" />
      </TouchableOpacity>

      <Modal transparent={true} animationType="slide" visible={modalVisible}>
        <TouchableWithoutFeedback onPress={handleBackgroundPress}>
          <View style={styles.modalBackground} testID="modal-background">
            <TouchableWithoutFeedback>
              <View style={styles.modalContainer} testID="modal-container">
                <Text style={{ fontSize: 18, marginBottom: 20 }} testID="modal-title">Change API URL</Text>
                <TextInput
                  style={styles.input}
                  value={apiUrl}
                  onChangeText={setApiUrl}
                  placeholder="Enter new API URL"
                  placeholderTextColor="#999"
                  testID="api-url-input"
                />
                <TouchableOpacity onPress={handleSavePress} testID="save-button">
                  <Text style={{ color: "black", fontSize: 16 }}>Save</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

    </View>
  );
};

export default ApiUrl;
