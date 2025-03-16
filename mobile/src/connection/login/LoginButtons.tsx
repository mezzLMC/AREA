import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { CustomButton } from "../ConnectButtons";
import LoginEmail from "./LoginEmail";
import GoogleAuth from '../GoogleAuth';

const styles = StyleSheet.create({
  buttonContainer: {
    top: 170,
    alignItems: "center",
    width: "96%",
  },
});

interface LoginButtonsProps {
  testID?: string;
}

export const LoginButtons: React.FC<LoginButtonsProps> = ({ testID }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [showWebView, setShowWebView] = useState(false);

  const onGooglePress = () => {
    setShowWebView(true);
  };

  const onFacePress = () => {
    console.log("Facebook pressed");
  };

  const onEmailPress = () => {
    setModalVisible(true);
  };

  return (
    <View style={styles.buttonContainer} testID={testID}>
      <CustomButton
        title="Sign in with Google"
        onPress={onGooglePress}
        color="white"
        textColor="black"
        iconColor="black"
        iconName="google"
        testID="google-button"
      />
      <CustomButton
        title="Sign in with Facebook"
        onPress={onFacePress}
        color="#4267B2"
        iconName="facebook"
        testID="facebook-button"
      />
      <CustomButton
        title="Sign in with E-Mail"
        onPress={onEmailPress}
        color="#0F0F0F"
        iconName="envelope"
        testID="email-button"
      />
      <LoginEmail
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        testID="email-modal"
      />
      <GoogleAuth showWebView={showWebView} onClose={() => setShowWebView(false)} testID="google-webview"/>
    </View>
  );
};

export default LoginButtons;
