import React from 'react'
import { render, screen } from '@testing-library/react'
import { GoogleOAuthProvider } from '@react-oauth/google'
import LoginButtons from '@/app/components/buttons/login'

describe('LoginButtons Component', () => {
    test('renders LoginButtons component', () => {
        render(
            <GoogleOAuthProvider clientId="733758596561-86kahmj0ljahhn0bkcc0t8fqrd6i6bod.apps.googleusercontent.com"> {/* Remplacez par votre client ID */}
                <LoginButtons setShown={jest.fn()} />
            </GoogleOAuthProvider>
        );
        const loginButtonsContainer = screen.getByRole('button', { name: /Sign In with Google/i });
        expect(loginButtonsContainer).toBeInTheDocument();
    });
})
