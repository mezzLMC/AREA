import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LogoButton from '@/app/(pages)/dashboard/logoButton';

const mockSetModalNextState = jest.fn();
const mockSetSelectedService = jest.fn();

const mockService = {
    id: 'service-1',
    imageURL: 'https://example.com/logo.png',
};

describe('LogoButton', () => {
    beforeEach(() => {
        render(
            <LogoButton
                service={mockService}
                setModalNextState={mockSetModalNextState}
                setSelectedService={mockSetSelectedService}
            />
        );
    });

    test('renders correctly with the service logo', () => {
        const buttonContainer = screen.getByTestId('logo-button-container');
        const button = screen.getByTestId('logo-button');
        expect(buttonContainer).toBeInTheDocument();
        expect(button).toBeInTheDocument();
        expect(button).toHaveStyle(`background-image: url('${mockService.imageURL}');`);
    });

    test('sets selected service and calls modal state function on button click', () => {
        const button = screen.getByTestId('logo-button');
        fireEvent.click(button);
        expect(mockSetSelectedService).toHaveBeenCalledWith(mockService);
        expect(mockSetModalNextState).toHaveBeenCalled();
    });

    test('changes background on hover', () => {
        const buttonContainer = screen.getByTestId('logo-button-container');
        fireEvent.mouseEnter(buttonContainer);
        fireEvent.mouseLeave(buttonContainer);
    });
});
