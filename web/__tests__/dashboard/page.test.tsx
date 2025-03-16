import React from 'react';
import { render, screen } from '@testing-library/react';
import DashBoardPage from '@/app/(pages)/dashboard/page';

describe('DashBoardPage', () => {
    test('renders dashboard title', () => {
        render(<DashBoardPage />);
        expect(screen.getByTestId('dashboard-title')).toHaveTextContent('Your AREAS');
    });

    test('renders area blocks', () => {
        render(<DashBoardPage />);
        const areaBlocks = screen.getAllByTestId('area-block');
        expect(areaBlocks.length).toBe(9);  // Should render 9 area blocks
    });
});
