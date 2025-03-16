import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  buttonContainer: {
    top: 100,
    alignItems: 'center',
    width: '100%',
  },
  button: {
    padding: 15,
    borderRadius: 50,
    margin: 10,
    width: '90%',
    alignItems: 'center',
    shadowOpacity: 0.8,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

interface Props {
  onGooglePress: () => void;
  onFacebookPress: () => void;
}

export const CustomButton: React.FC<{
  title: string;
  onPress: () => void;
  color: string;
  textColor?: string;
}> = ({ title, onPress, color, textColor = 'white' }) => (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: color, shadowColor: color },
      ]}
      onPress={onPress}
      testID={`button_${title.replace(/\s+/g, '_')}`} // Ajout de testID
    >
      <Text style={[styles.buttonText, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
);

export const OAuthButtons: React.FC<Props> = ({ onGooglePress, onFacebookPress }) => (
  <View style={styles.buttonContainer}>
    <CustomButton
      title="Sign in with Google"
      onPress={onGooglePress}
      color="white"
      textColor="black"
    />
    <CustomButton
      title="Sign in with Facebook"
      onPress={onFacebookPress}
      color="#3b5998"
    />
  </View>
);

export default OAuthButtons;
