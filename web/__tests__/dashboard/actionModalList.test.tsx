import React from 'react';
import { render } from '@testing-library/react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ActionModalList from '@/app/(pages)/dashboard/actionModalList';
import { modalState } from '@/app/(pages)/dashboard/areaModal';

jest.mock('@shared/Api', () => jest.fn().mockImplementation(() => ({
            services: {
                getById: jest.fn(() => Promise.resolve({ body: { id: '1', actions: [], reactions: [] } })),
            },
            users: {
                getMe: jest.fn(() => Promise.resolve({ body: { Oauth: {} } })),
            },
            oauth: {
                getAll: jest.fn(() => Promise.resolve([])),
            },
        })));

test('renders ActionModalList component and opens modal', () => {
    const mockSetSelectedArea = jest.fn();
    const mockSetModalNextState = jest.fn();
    const mockHandleClose = jest.fn();

    render(
        <GoogleOAuthProvider clientId="733758596561-86kahmj0ljahhn0bkcc0t8fqrd6i6bod.apps.googleusercontent.com">
            <ActionModalList
                app={{ id: 'app-id', oauthId: 'oauth-id', imageURL: 'app-image-url' }}
                setSelectedArea={mockSetSelectedArea}
                handleClose={mockHandleClose}
                setModalNextState={mockSetModalNextState}
                state={modalState.ACTION_CHOOSE_ACTION}
            />
        </GoogleOAuthProvider>
    );
});

