/**
 * @jest-environment node
 */
 /* eslint-disable */


import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Oauth from 'src/settings/oauth';
import useApi from 'src/hooks/useApi';

jest.mock('src/hooks/useApi');
const mockApi = {
  oauth: {
    generate: jest.fn().mockResolvedValue('https://oauth-url.com'),
  },
};

(useApi as jest.Mock).mockReturnValue(mockApi);

describe('Oauth Component', () => {

  it('displays the close button and closes modal on button press', () => {
    const mockOnClose = jest.fn();
    const { getByTestId } = render(
      <Oauth showWebView={true} onClose={mockOnClose} serviceId="spotify" />
    );

    const closeButton = getByTestId('close-button');
    expect(closeButton).toBeTruthy();

    fireEvent.press(closeButton);
    expect(mockOnClose).toHaveBeenCalled();
  });
});
