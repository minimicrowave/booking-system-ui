import { Home } from 'pages';
import React from 'react';
import { render, screen } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';

describe('<Home/>', () => {
    const navBarId = 'bsui-navbar';
    const cardId = 'bsui-card';

    beforeEach(() => {
        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );
    });

    it('should render with navbar and cards', async () => {
        const navBar = await screen.findByTestId(navBarId);
        const cards = await screen.findAllByTestId(cardId);

        expect(navBar).toBeTruthy();
        expect(cards).toHaveLength(2);
    });

    // FIXME: RRD mocking required, to find out
    it.skip('should redirect to their respective pages', () => {});
});
