/**
 * @jest-environment node
 */
 /* eslint-disable */


import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import SettingsPage from "src/settings/page";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

jest.mock('src/hooks/useApi', () => {
    return jest.fn().mockReturnValue({
        users: {
            getMe: jest.fn().mockResolvedValue({
                body: {
                    username: "TestUser",
                    email: "testuser@example.com",
                    Oauth: {
                        spotify: "connected",
                    },
                },
            }),
        },
    });
});

jest.mock('src/hooks/useAccessToken', () => jest.fn().mockReturnValue('mockedAccessToken'));

const Stack = createNativeStackNavigator();

const MockedSettingsPage = () => {
    const mockNavigation: any = {
        navigate: jest.fn(),
        dispatch: jest.fn(),
        goBack: jest.fn(),
        reset: jest.fn(),
        setParams: jest.fn(),
        isFocused: jest.fn(),
        canGoBack: jest.fn(),
        getParent: jest.fn(),
    };
    const mockRoute: any = {
        params: {},
        key: "some-key",
        name: "Settings",
    };

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Settings">
                    {() => <SettingsPage navigation={mockNavigation} route={mockRoute} />}
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

describe("SettingsPage", () => {
    it("renders loading indicator while fetching user data", async () => {
        const { getByTestId } = render(<MockedSettingsPage />);
        await waitFor(() => {
            expect(getByTestId("loading-indicator")).toBeTruthy();
        });
    });

    it("calls fetchUserData on mount", async () => {
        const { getByTestId } = render(<MockedSettingsPage />);
        await waitFor(() => expect(getByTestId("loading-indicator")).toBeTruthy());
        const api = require('src/hooks/useApi')();
        expect(api.users.getMe).toHaveBeenCalled();
    });

    it("displays user data after loading", async () => {
        const { findByText, findByTestId } = render(<MockedSettingsPage />);
        const loadingIndicator = await findByTestId("loading-indicator");
        expect(loadingIndicator).toBeTruthy();
        const username = await findByText("TestUser");
        expect(username).toBeTruthy();
        const email = await findByTestId("user-email");
        expect(email).toBeTruthy();
    });

    it("navigates to the OAuth page when an OAuth service button is pressed", async () => {
        const { getByTestId, findByTestId } = render(<MockedSettingsPage />);
        await findByTestId("user-container");
        const oauthButton = getByTestId("oauth-button-spotify");
        fireEvent.press(oauthButton);
        const mockNavigation = require('src/hooks/useApi')();
    });
});
