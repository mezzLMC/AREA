import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  buttonContainer: {
    top: 190,
    alignItems: "center",
    width: "96%",
  },
  button: {
    padding: 15,
    borderRadius: 50,
    margin: 10,
    width: "90%",
    alignItems: "center",
    shadowOpacity: 0.8,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

interface Props {
  onLoginPress: () => void;
  onSignUpPress: () => void;
  testID?: string;
}

export const CustomButton: React.FC<{
  title: string;
  onPress: () => void;
  color: string;
  textColor?: string;
  iconName?: string;
  iconColor?: string;
  testID?: string;
}> = ({ title, onPress, color, textColor = "white", iconName, testID }) => (
    <TouchableOpacity
      style={[
        styles.button,
        {backgroundColor: color, shadowColor: color},
      ]}
      onPress={onPress}
      testID={testID} // Ajout du testID ici
    >
      <View style={styles.iconContainer}>
        {iconName && <Icon name={iconName} size={20} color={textColor} style={{ marginRight: 10 }} />}
        <Text style={[styles.buttonText, { color: textColor }]}>{title}</Text>
      </View>
    </TouchableOpacity>
);

export const ConnectButtons: React.FC<Props> = ({ onLoginPress, onSignUpPress, testID }) => (
    <View style={styles.buttonContainer} testID={testID}>
      <CustomButton
        title="Sign In"
        onPress={onLoginPress}
        color="white"
        textColor="black"
        iconColor="black"
        iconName="sign-in"
        testID="sign-in-button" // testID pour le bouton de connexion
      />
      <CustomButton
        title="Get Started"
        onPress={onSignUpPress}
        color="#0F0F0F"
        iconName="sign-in"
        testID="get-started-button" // testID pour le bouton de démarrage
      />
    </View>
);

export default ConnectButtons;
