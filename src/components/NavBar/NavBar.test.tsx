import React from 'react';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TEST_ID from 'test/testIds.constant';

import NavBar from '.';

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...(jest.requireActual('react-router-dom') as any),
    useNavigate: () => mockedNavigate,
}));

describe('<NavBar/>', () => {
    beforeEach(() => {
        render(<NavBar />);
    });

    it('should render with logo and button', async () => {
        const button = await screen.findByTestId(TEST_ID.BUTTON);
        const logo = await screen.findByTestId(TEST_ID.LOGO);

        expect(logo).toBeInTheDocument();
        expect(button).toBeInTheDocument();
    });

    it('should redirect to login page upon clicking logout button', async () => {
        const button = await screen.findByTestId(TEST_ID.BUTTON);

        // click logout button
        await userEvent.click(button);
        await waitFor(() => {
            expect(mockedNavigate).toHaveBeenCalledTimes(1);
            expect(mockedNavigate).toHaveBeenCalledWith(
                '/login',
                expect.objectContaining({
                    replace: true,
                })
            );
        });
    });
});
