import React from 'react';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Home } from 'pages';
import { CARDS_METADATA } from 'pages/Home';

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...(jest.requireActual('react-router-dom') as any),
    useNavigate: () => mockedNavigate,
}));

describe('<Home/>', () => {
    const cardId = 'bsui-card';

    beforeEach(() => {
        render(<Home />);
    });

    it('should render cards', async () => {
        const cards = await screen.findAllByTestId(cardId);

        expect(cards).toHaveLength(CARDS_METADATA.length);
    });

    it('should redirect to their respective pages upon clicking card', async () => {
        const cards = await screen.findAllByTestId(cardId);

        for (const index in CARDS_METADATA) {
            const card = cards[index];

            // user clicks on card
            await userEvent.click(card);
            await waitFor(() => {
                expect(mockedNavigate).toHaveBeenCalledTimes(Number(index) + 1);
                expect(mockedNavigate).toHaveBeenCalledWith(
                    CARDS_METADATA[index].path,
                    expect.objectContaining({
                        replace: true,
                    })
                );
            });
        }
    });
});
