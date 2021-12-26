import React from 'react';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

import NavBar from '.';

describe('<NavBar/>', () => {
    const logoId = 'bsui-logo';
    const buttonId = 'bsui-button';

    beforeEach(() => {
        render(
            <MemoryRouter>
                <NavBar />
            </MemoryRouter>
        );
    });

    it('should render with logo and button', async () => {
        const button = await screen.findByTestId(buttonId);
        const logo = await screen.findByTestId(logoId);

        expect(logo).toBeTruthy();
        expect(button).toBeTruthy();
    });

    it.skip('should redirect to login page upon clicking logout button', async () => {
        // FIXME: can't mock RRD :/
        const button = await screen.findByTestId(buttonId);

        const mockedNavigate = jest.fn((s) => s);

        jest.mock('react-router-dom', () => ({
            ...jest.requireActual('react-router-dom'),
            useNavigation: () => mockedNavigate,
        }));

        // click logout button
        await userEvent.click(button);
        await waitFor(() => {
            expect(mockedNavigate).toHaveBeenCalledTimes(1);
        });
    });
});
