/**
 * @jest-environment node
 */
 /* eslint-disable */


import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import OAuthButtons from 'src/components/OauthButtons'; // Mettez à jour le chemin d'importation en fonction de votre structure de projet

describe('OAuthButtons Component', () => {
  const mockGooglePress = jest.fn();
  const mockFacebookPress = jest.fn();

  it('renders correctly', () => {
    const { getByTestId } = render(
      <OAuthButtons onGooglePress={mockGooglePress} onFacebookPress={mockFacebookPress} />
    );

    expect(getByTestId('button_Sign_in_with_Google')).toBeTruthy();
    expect(getByTestId('button_Sign_in_with_Facebook')).toBeTruthy();
  });

  it('calls onGooglePress when the Google button is pressed', () => {
    const { getByTestId } = render(
      <OAuthButtons onGooglePress={mockGooglePress} onFacebookPress={mockFacebookPress} />
    );

    fireEvent.press(getByTestId('button_Sign_in_with_Google'));
    expect(mockGooglePress).toHaveBeenCalled();
  });

  it('calls onFacebookPress when the Facebook button is pressed', () => {
    const { getByTestId } = render(
      <OAuthButtons onGooglePress={mockGooglePress} onFacebookPress={mockFacebookPress} />
    );

    fireEvent.press(getByTestId('button_Sign_in_with_Facebook'));
    expect(mockFacebookPress).toHaveBeenCalled();
  });
});
