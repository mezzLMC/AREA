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
    height: "60%",
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
  SignUpButton: {
    position: "absolute",
    top: 340,
    marginTop: 30,
    alignSelf: "center",
    width: "80%",
    backgroundColor: "white",
    padding: 12,
    borderRadius: 50,
  },
  SignUpButtonText: {
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

interface RegisterEmailProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  testID?: string;
}

interface ErrorStore {
  email: string | null;
  username: string | null;
  password: string | null;
}

type RegisterButtonsNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const RegisterEmail: React.FC<RegisterEmailProps> = ({ modalVisible, setModalVisible, testID }) => {
  const [formData, setFormData] = useState({ username: "", password: "", email: "" });
  const [errors, setErrors] = useState<ErrorStore>({ email: null, username: null, password: null });
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

  const handleInputChange = (field: string, value: string) => setFormData({ ...formData, [field]: value });

  const validateForm = () => {
    const emailRegex = /\S+@\S+\.\S+/;
    const newErrors: ErrorStore = {
      email: null,
      username: null,
      password: null,
    };

    if (!formData.email)
      newErrors.email = "Email is required*";
    else if (!emailRegex.test(formData.email))
      newErrors.email = "Invalid email format*";

    if (!formData.username)
      newErrors.username = "Username is required*";
    else if (formData.username.length < 3)
      newErrors.username = "Username must be at least 3 characters*";

    if (!formData.password)
      newErrors.password = "Password is required*";
    else if (formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters*";

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== null);
  };

  const handleSignUp = async () => {
    if (isSubmitting || !api) return;

    if (validateForm()) {
      setIsSubmitting(true);
      const { body } = await api.auth.register(formData);
      const accessToken = body.token;
      if (accessToken) {
        await storeToken(accessToken);
        setModalVisible(false);
        navigation.navigate("Home");
      }
    }
  };

  const renderInput = (iconName: string, placeholder: string, field: keyof ErrorStore, secureTextEntry = false) => (
    <View>
      <View style={styles.inputContainer}>
        <Icon name={iconName} size={20} color="#c6c5c5" style={[{ marginRight: 10 }]} />
        <TextInput
          style={[styles.input, errors[field] ? { borderColor: "red" } : null]}
          placeholder={placeholder}
          placeholderTextColor="#c6c5c5"
          value={formData[field]}
          onChangeText={(value) => handleInputChange(field, value)}
          secureTextEntry={secureTextEntry}
          testID={`${field}-input`} // Ajout du testID ici
        />
      </View>
      {errors[field] && <Text style={styles.errorText}>{errors[field]}</Text>}
    </View>
  );

  return (
    <Modal animationType="slide" transparent visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
      <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Animated.View style={[styles.modalContent, { transform: [{ translateY: modalPosition }] }]}>
              <Text style={styles.modalTitle}>Welcome to AREA</Text>
              <Text style={styles.modalBody}>Sign up to access the features of AREA.</Text>
              {renderInput("envelope", "Email Address*", "email")}
              {renderInput("user", "Username*", "username")}
              {renderInput("lock", "Password*", "password", true)}
              <TouchableOpacity
                testID="signup-button" // Ajout du testID ici
                onPress={handleSignUp}
                style={styles.SignUpButton}
                disabled={isSubmitting}
              >
                <Text style={styles.SignUpButtonText}>{isSubmitting ? "Submitting..." : "Sign Up"}</Text>
              </TouchableOpacity>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default RegisterEmail;
