import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useCookies } from 'next-client-cookies';
import API from '@shared/Api';
import { LoginModal, RegisterModal } from '@/app/components/connectionModals';

jest.mock('@shared/Api');
jest.mock('next-client-cookies');

const mockedApi = {
    auth: {
        login: jest.fn(),
        register: jest.fn(),
    },
};

API.mockImplementation(() => mockedApi);
useCookies.mockReturnValue({
    set: jest.fn(),
});

describe('LoginModal component', () => {
    it('should render login modal', () => {
        const { getByPlaceholderText } = render(<LoginModal shown={true} />);
        expect(getByPlaceholderText('Email')).toBeInTheDocument();
        expect(getByPlaceholderText('Password')).toBeInTheDocument();
    });

    it('should handle successful login', async () => {
        mockedApi.auth.login.mockResolvedValue({
            status: 200,
            body: { token: 'fake_token' },
            error: null,
        });

        const { getByPlaceholderText } = render(<LoginModal shown={true} />);
        fireEvent.change(getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
        fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'password123' } });

    });

    it('should handle login error', async () => {
        mockedApi.auth.login.mockResolvedValue({
            status: 400,
            body: null,
            error: [{ path: ['email'], message: 'Invalid email' }],
        });

        const { getByPlaceholderText } = render(<LoginModal shown={true} />);
        fireEvent.change(getByPlaceholderText('Email'), { target: { value: 'invalid@example.com' } });
        fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'wrongpassword' } });

    });
});

describe('RegisterModal component', () => {
    it('should render register modal', () => {
        const { getByPlaceholderText } = render(<RegisterModal shown={true} />);
        expect(getByPlaceholderText('Email')).toBeInTheDocument();
        expect(getByPlaceholderText('Username')).toBeInTheDocument();
        expect(getByPlaceholderText('Password')).toBeInTheDocument();
    });

    it('should handle successful registration', async () => {
        mockedApi.auth.register.mockResolvedValue({
            status: 200,
            body: { token: 'fake_token' },
            error: null,
        });

        const { getByPlaceholderText } = render(<RegisterModal shown={true} />);
        fireEvent.change(getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
        fireEvent.change(getByPlaceholderText('Username'), { target: { value: 'testuser' } });
        fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'password123' } });

    });

    it('should handle registration error', async () => {
        mockedApi.auth.register.mockResolvedValue({
            status: 400,
            body: null,
            error: [
                { path: ['email'], message: 'Email is required' },
                { path: ['username'], message: 'Username is required' },
            ],
        });

        const { getByPlaceholderText } = render(<RegisterModal shown={true} />);
        fireEvent.change(getByPlaceholderText('Email'), { target: { value: '' } });
        fireEvent.change(getByPlaceholderText('Username'), { target: { value: '' } });
        fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'password123' } });
    });
});
