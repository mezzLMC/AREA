/**
 * @jest-environment node
 */
 /* eslint-disable */


import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import GoogleAuth from 'src/connection/GoogleAuth';
import useApi from 'src/hooks/useApi';

jest.mock('src/hooks/useApi');

describe('GoogleAuth Component', () => {
  const mockOnClose = jest.fn();
  const mockLoginWithGoogle = jest.fn();
  const mockApi = {
    auth: {
      loginWithGoogle: jest.fn(() => Promise.resolve({ body: {}, status: 200, error: null })),
    },
  };

  const renderWithNavigation = (component: JSX.Element) => (
    render(<NavigationContainer>{component}</NavigationContainer>)
  );

  beforeEach(() => {
    (useApi as jest.Mock).mockReturnValue(mockApi);
    mockOnClose.mockClear();
    mockLoginWithGoogle.mockClear();
  });

  it('renders the modal and webview correctly', () => {
    const { getByTestId } = renderWithNavigation(
      <GoogleAuth showWebView={true} onClose={mockOnClose} testID="google-auth" />
    );

    expect(getByTestId('google-auth-modal')).toBeTruthy();
    expect(getByTestId('google-auth-webview')).toBeTruthy();
    expect(getByTestId('google-auth-close-button')).toBeTruthy();
  });

  it('calls onClose when the close button is pressed', () => {
    const { getByTestId } = renderWithNavigation(
      <GoogleAuth showWebView={true} onClose={mockOnClose} testID="google-auth" />
    );

    fireEvent.press(getByTestId('google-auth-close-button'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls loginWithGoogle and closes modal on successful navigation', async () => {
    const { getByTestId } = renderWithNavigation(
      <GoogleAuth showWebView={true} onClose={mockOnClose} testID="google-auth" />
    );
    const webView = getByTestId('google-auth-webview');
    fireEvent(webView, 'navigationStateChange', {
      url: 'http://localhost:8080/api/auth/google?code=AUTH_CODE',
      title: '',
      canGoBack: false,
      canGoForward: false,
      loading: false,
    });
    await waitFor(() => {
      expect(mockApi.auth.loginWithGoogle).toHaveBeenCalledWith('AUTH_CODE');
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });
});
