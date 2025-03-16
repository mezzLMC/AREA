/**
 * @jest-environment node
 */
 /* eslint-disable */


import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { View, TouchableOpacity, Text } from 'react-native';
import LoginButtons from 'src/connection/login/LoginButtons';

jest.mock('src/connection/login/LoginEmail', () => {
  const MockLoginEmail = ({ modalVisible }: { modalVisible: boolean }) =>
    modalVisible ? <View testID="email-modal-mock" /> : null;
  MockLoginEmail.displayName = 'MockLoginEmail';
  return MockLoginEmail;
});

jest.mock('src/connection/GoogleAuth', () => {
  const MockGoogleAuth = ({ showWebView, onClose }: { showWebView: boolean; onClose: () => void }) =>
    showWebView ? (
      <View testID="google-webview-mock">
        <TouchableOpacity onPress={onClose} testID="close-button">
          <Text>Close</Text>
        </TouchableOpacity>
      </View>
    ) : null;
  MockGoogleAuth.displayName = 'MockGoogleAuth';
  return MockGoogleAuth;
});

describe('LoginButtons', () => {
  it('renders all buttons correctly', () => {
    const { getByTestId } = render(<LoginButtons testID="login-buttons" />);

    expect(getByTestId('google-button')).toBeTruthy();
    expect(getByTestId('facebook-button')).toBeTruthy();
    expect(getByTestId('email-button')).toBeTruthy();
  });

  it('opens GoogleAuth when Google button is pressed', () => {
    const { getByTestId, queryByTestId } = render(<LoginButtons />);

    fireEvent.press(getByTestId('google-button'));
    expect(queryByTestId('google-webview-mock')).toBeTruthy();
  });

  it('closes GoogleAuth when the close button is pressed', () => {
    const { getByTestId, queryByTestId } = render(<LoginButtons />);
    fireEvent.press(getByTestId('google-button'));
    expect(queryByTestId('google-webview-mock')).toBeTruthy();
    fireEvent.press(getByTestId('close-button'));
    expect(queryByTestId('google-webview-mock')).toBeNull();
  });

  it('opens LoginEmail modal when Email button is pressed', () => {
    const { getByTestId, queryByTestId } = render(<LoginButtons />);

    fireEvent.press(getByTestId('email-button'));
    expect(queryByTestId('email-modal-mock')).toBeTruthy();
  });

  it('logs a message when Facebook button is pressed', () => {
    const logSpy = jest.spyOn(console, 'log');
    const { getByTestId } = render(<LoginButtons />);

    fireEvent.press(getByTestId('facebook-button'));
    expect(logSpy).toHaveBeenCalledWith("Facebook pressed");
  });
});
