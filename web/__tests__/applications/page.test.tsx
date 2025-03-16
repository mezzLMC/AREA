import React from 'react';
import { render, screen } from '@testing-library/react';
import ApplicationsPage from '@/app/(pages)/applications/page';

describe('ApplicationsPage', () => {
    it('renders correctly', () => {
        render(<ApplicationsPage />);
        expect(screen.getByTestId('applications-page')).toBeInTheDocument();
        expect(screen.getByTestId('applications-title')).toBeInTheDocument();
        expect(screen.getByTestId('menu')).toBeInTheDocument();
    });
});
