import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from "src/types";
import { CustomButton } from "../ConnectButtons";
import RegisterEmail from "./RegisterEmail";
import GoogleAuth from '../GoogleAuth';

const styles = StyleSheet.create({
  buttonContainer: {
    top: 170,
    alignItems: "center",
    width: "96%",
  },
});

interface RegisterButtonsProps {
  testID?: string;
}

type RegisterButtonsNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const RegisterButtons: React.FC<RegisterButtonsProps> = ({ testID }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [showWebView, setShowWebView] = useState(false);
  const navigation = useNavigation<RegisterButtonsNavigationProp>();

  const onGooglePress = () => {
    setShowWebView(true);
  };

  const onFacePress = () => {
    console.log("Facebook");
    // navigation.replace("Home");
  };

  const onEmailPress = () => {
    setModalVisible(true);
  };

  return (
    <View style={styles.buttonContainer} testID={testID}>
      <CustomButton
        title="Sign up with Google"
        onPress={onGooglePress}
        color="white"
        textColor="black"
        iconColor="black"
        iconName="google"
        testID="google-signup-button"
      />
      <CustomButton
        title="Sign up with Facebook"
        onPress={onFacePress}
        color="#4267B2"
        iconName="facebook"
        testID="facebook-signup-button"
      />
      <CustomButton
        title="Sign up with E-Mail"
        onPress={onEmailPress}
        color="#0F0F0F"
        iconName="envelope"
        testID="email-signup-button"
      />
      <RegisterEmail
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        testID="register-email-modal"
      />
      <GoogleAuth showWebView={showWebView} onClose={() => setShowWebView(false)} testID="google-auth-modal" />
    </View>
  );
};

export default RegisterButtons;
