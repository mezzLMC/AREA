import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Modal, Text, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard, Animated } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from "src/types";
import useApi from "src/hooks/useApi";
import { storeToken } from "../../LocalStorage";

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  modalContent: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "55%",
    padding: 30,
    backgroundColor: "#1c1c1c",
    borderRadius: 40,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    color: "white",
  },
  modalBody: {
    fontSize: 16,
    color: "white",
    marginBottom: 40,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 50,
    color: "white",
    paddingLeft: 10,
  },
  closeButton: {
    top: 20,
    marginTop: 30,
    alignSelf: "center",
    width: "80%",
    backgroundColor: "white",
    padding: 12,
    borderRadius: 50,
  },
  closeButtonText: {
    color: "black",
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginLeft: 10,
    marginBottom: 20,
    marginTop: -10,
  },
});

interface LoginEmailProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  testID?: string;
}

type RegisterButtonsNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const LoginEmail: React.FC<LoginEmailProps> = ({ modalVisible, setModalVisible }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<{ email: string | null; password: string | null }>({ email: null, password: null });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const modalPosition = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation<RegisterButtonsNavigationProp>();
  const api = useApi();

  const animateModal = (toValue: number) => {
    Animated.timing(modalPosition, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    const showListener = Keyboard.addListener("keyboardDidShow", () => animateModal(-300));
    const hideListener = Keyboard.addListener("keyboardDidHide", () => animateModal(0));
    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const validateForm = () => {
    const newErrors = {
      email: formData.email ? null : "Email is required*",
      password: formData.password ? null : "Password is required*",
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSignIn = async () => {
    if (isSubmitting || !api) return;
    if (validateForm()) {
      setIsSubmitting(true);
      console.log("Form is valid, attempting to sign in...");
  
      const { body } = await api.auth.login(formData.email, formData.password);
      console.log("API response:", body);
  
      const accessToken = body.token;
      if (accessToken) {
        await storeToken(accessToken);
        setModalVisible(false);
        navigation.navigate("Home");
      } else {
        console.error("No access token received.");
      }
    }
  };
  

  const renderInput = (iconName: string, placeholder: string, field: keyof typeof errors, secureTextEntry = false) => (
    <View>
    <View style={styles.inputContainer}>
      <Icon name={iconName} size={20} color="#c6c5c5" style={{ marginRight: 10 }} />
      <TextInput
        testID={`${field}-input`}
        style={[styles.input, errors[field] ? { borderColor: "red" } : null]}
        placeholder={placeholder}
        placeholderTextColor="#c6c5c5"
        value={formData[field]}
        onChangeText={(value) => handleInputChange(field, value)}
        secureTextEntry={secureTextEntry}
      />
    </View>
    {errors[field] && <Text testID={`${field}-error`} style={styles.errorText}>{errors[field]}</Text>}
  </View>
  );

  return (
    <Modal animationType="slide" transparent visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
      <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Animated.View style={[styles.modalContent, { transform: [{ translateY: modalPosition }] }]}>
              <Text style={styles.modalTitle}>Welcome Back to AREA</Text>
              <Text style={styles.modalBody}>Sign in to access the features of AREA.</Text>
              {renderInput("envelope", "Email Address*", "email")}
              {renderInput("lock", "Password*", "password", true)}
              <TouchableOpacity testID="sign-in-button" onPress={handleSignIn} style={styles.closeButton} disabled={isSubmitting}>
                <Text style={styles.closeButtonText}>{isSubmitting ? "Signing In..." : "Sign In"}</Text>
              </TouchableOpacity>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default LoginEmail;
