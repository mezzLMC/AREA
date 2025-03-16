/**
 * @jest-environment node
 */
 /* eslint-disable */


import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { NavigationProp } from '@react-navigation/native';
import MenuBar from 'src/components/Menu';

const mockNavigation = {
    navigate: jest.fn(),
} as unknown as NavigationProp<any>;

describe('MenuBar Component', () => {
    it('navigates to Home when home icon is pressed', () => {
        const { getByTestId } = render(<MenuBar activePage="home" navigation={mockNavigation} />);

        const homeButton = getByTestId('home-button');
        fireEvent.press(homeButton);

        expect(mockNavigation.navigate).toHaveBeenCalledWith('Home');
    });

    it('navigates to Library when library icon is pressed', () => {
        const { getByTestId } = render(<MenuBar activePage="lib" navigation={mockNavigation} />);

        const libraryButton = getByTestId('library-button');
        fireEvent.press(libraryButton);

        expect(mockNavigation.navigate).toHaveBeenCalledWith('Library');
    });

    it('navigates to Settings when settings icon is pressed', () => {
        const { getByTestId } = render(<MenuBar activePage="settings" navigation={mockNavigation} />);

        const settingsButton = getByTestId('settings-button');
        fireEvent.press(settingsButton);

        expect(mockNavigation.navigate).toHaveBeenCalledWith('Settings');
    });

    it('opens the CreateServices modal when the add button is pressed', () => {
        const { getByTestId } = render(<MenuBar activePage="home" navigation={mockNavigation} />);

        const addButton = getByTestId('add-button');
        fireEvent.press(addButton);
    });

    it('navigates to Profile when user icon is pressed', () => {
        const { getByTestId } = render(<MenuBar activePage="user" navigation={mockNavigation} />);

        const userButton = getByTestId('user-button');
        fireEvent.press(userButton);

        expect(mockNavigation.navigate).toHaveBeenCalledWith('Profile');
    });
});
