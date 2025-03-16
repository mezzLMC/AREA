import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import API from '@shared/Api';
import OAuthButton from '@/app/components/OAuthButton';

jest.mock('@shared/Api');

describe('OAuthButton component', () => {
    const mockGenerate = jest.fn();
    const mockDisconnect = jest.fn();

    beforeEach(() => {
        (API as jest.Mock).mockImplementation(() => ({
            oauth: {
                generate: mockGenerate,
                disconnect: mockDisconnect,
            },
        }));

        jest.spyOn(window, 'open').mockImplementation(() => null);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render connect button when not connected', () => {
        const { getByTestId } = render(<OAuthButton serviceId="testService" connected={false} testID="oauth-button" />);
        const connectButton = getByTestId('oauth-button-connect');
        expect(connectButton).toBeTruthy();
    });

    it('should render disconnect button when connected', () => {
        const { getByTestId } = render(<OAuthButton serviceId="testService" connected={true} testID="oauth-button" />);
        const disconnectButton = getByTestId('oauth-button-disconnect');
        expect(disconnectButton).toBeTruthy();
    });

    it('should call disconnect when disconnect button is clicked', async () => {
        const { getByTestId } = render(<OAuthButton serviceId="testService" connected={true} testID="oauth-button" />);
        const disconnectButton = getByTestId('oauth-button-disconnect');
        await fireEvent.click(disconnectButton);
        expect(mockDisconnect).toHaveBeenCalled();
    });

    it('should call getOauthUrl when connect button is clicked', async () => {
        const { getByTestId } = render(<OAuthButton serviceId="testService" connected={false} testID="oauth-button" />);
        const connectButton = getByTestId('oauth-button-connect');
        await fireEvent.click(connectButton);
    });
});
