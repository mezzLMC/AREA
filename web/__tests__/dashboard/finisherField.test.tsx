import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AReaInfo, ServiceInfo } from '@shared/types';
import FinisherField from '@/app/(pages)/dashboard/finisherField';

const mockSetPayload = jest.fn();
const mockSetModalNextState = jest.fn();
const mockHandleClose = jest.fn();

const mockApp: ServiceInfo = {
    id: 'service-1',
    imageURL: 'https://example.com/image.jpg',
    actionCount: 1,
    description: 'Service 1',
    name: 'Service 1',
    reactionCount: 1,
};

const mockSelectedArea: AReaInfo = {
    id: 'area-1',
    description: 'Area 1',
    enrichments: [],
    name: 'Area 1',
    fields: [
        { id: 'field-1', name: 'Field 1', type: 'text_field' },
        { id: 'field-2', name: 'Field 2', type: 'text_field' },
    ],
};

describe('FinisherField', () => {
    beforeEach(() => {
        render(
            <FinisherField
                app={mockApp}
                selectedArea={mockSelectedArea}
                setPayload={mockSetPayload}
                setModalNextState={mockSetModalNextState}
                handleClose={mockHandleClose}
            />
        );
    });

    test('renders correctly with app and selected area', () => {
        expect(screen.getByTestId('finisher-field')).toBeInTheDocument();
        expect(screen.getByTestId('app-image')).toHaveAttribute('src', mockApp.imageURL);
        expect(screen.getByTestId('fields-container')).toBeInTheDocument();
        expect(screen.getAllByTestId(/field/i)).toHaveLength(mockSelectedArea.fields.length);
    });

    test('closes modal when close button is clicked', () => {
        fireEvent.click(screen.getByTestId('close-button'));
        expect(mockHandleClose).toHaveBeenCalled();
    });
});
