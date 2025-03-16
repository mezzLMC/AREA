import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Animated, SafeAreaView, TouchableWithoutFeedback } from "react-native";
import GradientTemplate from "../components/GradientTemplate";
import ConnectButtons from "./ConnectButtons";
import LoginButtons from "./login/LoginButtons";
import RegisterButtons from "./register/RegisterButtons";
import particles from "../../assets/images/particles.png";
import { storeApiUrl } from "../LocalStorage";
import ApiUrl from "./ApiUrl";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    position: "absolute",
    top: 330,
    color: "white",
    fontSize: 48,
    fontWeight: "bold",
  },
  agreementText: {
    position: "absolute",
    top: 710,
    width: 280,
    color: "#666680",
    fontSize: 12,
    textAlign: "center",
  },
  connectButtonsContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  connectButtons: {
    width: "100%",
    alignItems: "center"
  },
});

const ConnectionScreen = () => {
  const floatAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const connectOpacityAnim = useRef(new Animated.Value(1)).current;
  const [showNewButtons, setShowNewButtons] = useState(false);
  const [showRegisterButtons, setShowRegisterButtons] = useState(false);

  useEffect(() => {
    const storeApiUrlOnMount = async () => {
      await storeApiUrl("http://10.74.252.167:8080/api");
    };
    storeApiUrlOnMount();

    const animations = [
      { y: -12 }, { y: 12 }, { y: 0 },
    ];
    Animated.loop(
      Animated.sequence(
        animations.map(({ y }) =>
          Animated.timing(floatAnim, {
            toValue: y,
            duration: 2000,
            useNativeDriver: true,
          })
        )
      )
    ).start();
  }, [floatAnim]);

  const handleLoginPress = () => {
    setShowNewButtons(true);
    setShowRegisterButtons(false);
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const handleRegisterPress = () => {
    setShowRegisterButtons(true);
    setShowNewButtons(false);
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const handleBackgroundPress = () => {
    if (showNewButtons || showRegisterButtons) {
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 350,
        useNativeDriver: true,
      }).start(() => {
        setShowNewButtons(false);
        setShowRegisterButtons(false);
      });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#1c1c23" }}>
      <GradientTemplate />
      <TouchableWithoutFeedback onPress={handleBackgroundPress} testID="background">
        <View style={styles.container}>
          <Animated.Image
            source={particles}
            style={[{ position: "absolute", top: 80, left: -30 }, { transform: [{ translateY: floatAnim }] }]}
            testID="particles1"
          />
          <Animated.Image
            source={particles}
            style={[{ position: "absolute", top: 260, left: 260, transform: [{ rotate: "45deg" }] }, { transform: [{ translateY: floatAnim }] }]}
            testID="particles2"
          />
          <Text style={styles.title} testID="title">AREA</Text>
          {showNewButtons && (
            <Animated.View style={[styles.connectButtons, { opacity: opacityAnim }]} testID="loginButtonsContainer">
              <LoginButtons testID="loginButtons" />
            </Animated.View>
          )}
          {showRegisterButtons && (
            <Animated.View style={[styles.connectButtons, { opacity: opacityAnim }]} testID="registerButtonsContainer">
              <RegisterButtons testID="registerButtons" />
            </Animated.View>
          )}
          {!showNewButtons && !showRegisterButtons && (
            <Animated.View style={[styles.connectButtons, { opacity: connectOpacityAnim }]} testID="connectButtonsContainer">
              <ConnectButtons
                onLoginPress={handleLoginPress}
                onSignUpPress={handleRegisterPress}
                testID="connectButtons"
              />
            </Animated.View>
          )}
          <Text style={styles.agreementText} testID="agreementText">
            By connecting, you agree to our Terms of Use. Learn how we collect, use and share your data.
          </Text>
          <ApiUrl />
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default ConnectionScreen;
