import React from 'react';
import { render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import DashBoardPage from '@/app/(pages)/dashboard/page';

jest.mock('@/app/(pages)/dashboard/areaModal', () =>
    function MockAreaModal({ show }: { show: boolean }) {
        return show ? <div data-testid="modal">Mock Modal</div> : null;
    }
);

describe('DashBoardPage', () => {
    it('renders the dashboard title', () => {
        render(<DashBoardPage />);
        const title = screen.getByTestId('dashboard-title');
        expect(title).toHaveTextContent('Your AREAS');
    });

    it('renders area blocks', () => {
        render(<DashBoardPage />);
        const areaBlocks = screen.getByTestId('area-blocks');
        expect(areaBlocks).toBeInTheDocument();
        expect(areaBlocks.children.length).toBe(9);
    });
});
