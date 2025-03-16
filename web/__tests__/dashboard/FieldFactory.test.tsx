import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FieldFactory from '@/app/(pages)/dashboard/FieldFactory';

describe('FieldFactory', () => {
    const mockUpdateField = jest.fn();


    it('renders TextFieldComponent and updates value', () => {
        render(<FieldFactory updateField={mockUpdateField} field={{ type: 'text_field', name: 'textField', id: '1' }} fieldName="Enter Text" />);

        expect(screen.getByTestId('text-field')).toBeInTheDocument();
        fireEvent.change(screen.getByTestId('text-field'), { target: { value: 'Hello World' } });

        expect(mockUpdateField).toHaveBeenCalledWith('Hello World');
    });

    it('renders SelectFieldComponent and updates value', () => {
        const options = [
            { value: 'option1', name: 'Option 1' },
            { value: 'option2', name: 'Option 2' },
        ];

        render(<FieldFactory updateField={mockUpdateField} field={{ type: 'select_field', values: options, name: 'selectField', id: '2' }} fieldName="Select an Option" />);

        expect(screen.getByTestId('select-field')).toBeInTheDocument();
        fireEvent.change(screen.getByTestId('select-field'), { target: { value: 'option2' } });

        expect(mockUpdateField).toHaveBeenCalledWith('option2');
    });
});
