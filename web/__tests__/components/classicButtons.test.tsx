import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ConnectButtons } from '@/app/components/buttons/classicButtons';

describe('ConnectButtons Component', () => {
    const onLoginPress = jest.fn();
    const onSignUpPress = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        render(<ConnectButtons onLoginPress={onLoginPress} onSignUpPress={onSignUpPress} />);
    });

    test('calls onLoginPress when Sign In button is clicked', () => {
        const signInButton = screen.getByTestId('sign-in-button');
        fireEvent.click(signInButton);
        expect(onLoginPress).toHaveBeenCalledTimes(1);
    });

    test('calls onSignUpPress when Get Started button is clicked', () => {
        const getStartedButton = screen.getByTestId('get-started-button');
        fireEvent.click(getStartedButton);
        expect(onSignUpPress).toHaveBeenCalledTimes(1);
    });
});
