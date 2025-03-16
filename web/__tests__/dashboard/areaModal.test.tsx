import React from 'react';
import { render, screen } from '@testing-library/react';
import API from '@shared/Api';
import AreaModal from '@/app/(pages)/dashboard/areaModal';

jest.mock('@shared/Api');

describe('AreaModal', () => {
    const mockHandleClose = jest.fn();
    const mockSetPassed = jest.fn();
    beforeEach(() => {
        jest.clearAllMocks();
        API.prototype.services = {
            getAll: jest.fn().mockResolvedValue({ body: { services: [] } }),
        };
    });

    it('does not render when show is false', () => {
        const { container } = render(<AreaModal show={false} handleClose={mockHandleClose} passed={false} setPassed={mockSetPassed} />);
        expect(container.firstChild).toBeNull();
    });

    it('renders correctly when show is true', async () => {
        render(<AreaModal show={true} handleClose={mockHandleClose} passed={false} setPassed={mockSetPassed} />);
        expect(await screen.findByTestId('modal-title')).toBeInTheDocument();
        expect(screen.getByTestId('close-button')).toBeInTheDocument();
    });
});
