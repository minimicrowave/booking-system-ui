import React from 'react';

import { render, screen } from '@testing-library/react';
import TEST_ID from 'test/testIds.constant';

import Loader from '.';

describe('<Loader/>', () => {
    it('should render without crashing', () => {
        render(<Loader />);
    });

    it('should loader component', () => {
        render(<Loader />);
        expect(screen.queryByTestId(TEST_ID.LOADER)).toBeInTheDocument();
    });
});
