import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import Menu from '@/app/components/menu';

jest.mock('next/navigation', () => ({
    usePathname: jest.fn(),
}));

describe('Menu component', () => {
    beforeEach(() => {
        (usePathname as jest.Mock).mockReturnValue('/');
    });

    it('should render the Menu component', () => {
        const { getByTestId } = render(<Menu />);
        const menu = getByTestId('menu');
        expect(menu).toBeTruthy();
    });

    it('should render the back to menu button', () => {
        const { getByTestId } = render(<Menu />);
        const backButton = getByTestId('back-to-menu-button');
        expect(backButton).toBeTruthy();
    });

    it('should navigate to dashboard when back to menu button is clicked and not on dashboard', () => {
        const { getByTestId } = render(<Menu />);
        const backButton = getByTestId('back-to-menu-button');
        fireEvent.click(backButton);
        expect(window.location.href).toBe('http://localhost/');
    });

    it('should not navigate to dashboard when already on dashboard', () => {
        (usePathname as jest.Mock).mockReturnValue('/dashboard');

        const { getByTestId } = render(<Menu />);
        const backButton = getByTestId('back-to-menu-button');
        fireEvent.click(backButton);
        expect(window.location.href).toBe('http://localhost/');
    });
});
