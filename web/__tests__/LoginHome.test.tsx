import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '@/app/page';

describe('Home Page', () => {
    test('renders without crashing', () => {
        render(<Home />);
        const homePage = screen.getByTestId('home-page');
        expect(homePage).toBeInTheDocument();
    });
});
