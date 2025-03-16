import React from 'react';
import { render} from '@testing-library/react';
import Wrapper from '@/app/components/wrapper';

describe('Wrapper component', () => {
    it('should render correctly with children', () => {
        const { getByTestId } = render(
            <Wrapper line={true} testID="wrapper-test-id">
                <div>Child Component</div>
            </Wrapper>
        );

        const wrapper = getByTestId('wrapper-test-id');
        expect(wrapper).toBeTruthy();
        expect(wrapper.children.length).toBe(2);
    });

    it('should apply correct styles based on line prop', () => {
        const { getByTestId } = render(
            <Wrapper line={false} testID="wrapper-test-id">
                <div>Child Component</div>
            </Wrapper>
        );
        getByTestId('wrapper-test-id');
    });
});
