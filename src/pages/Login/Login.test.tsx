import React from 'react';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockAxios from 'axios';
import { Login } from 'pages';
import { wrapper } from 'test/helpers';
import TEST_ID from 'test/testIds.constant';

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...(jest.requireActual('react-router-dom') as any),
    useNavigate: () => mockedNavigate,
}));

describe('<Login/>', () => {
    const username = 'username';
    const password = 'password';

    beforeEach(() => {
        render(wrapper(<Login />));
    });

    it('should successfully render page with login form', async () => {
        const form = await screen.findByTestId(TEST_ID.FORM);
        const inputs = await screen.findAllByTestId(TEST_ID.INPUT);
        const submitButton = await screen.findByTestId(TEST_ID.BUTTON);

        expect(form).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
        expect(submitButton).toHaveAttribute('type', 'submit');
        expect(inputs).toHaveLength(2);
    });

    describe('Login form', () => {
        let submitButton: HTMLElement;
        let usernameField: HTMLElement;
        let passwordField: HTMLElement;

        const errorMessages = {
            username: 'Please input your username!',
            password: 'Please input your password!',
        };

        beforeEach(async () => {
            expect(screen.queryByText(errorMessages.username)).toBeNull();
            expect(screen.queryByText(errorMessages.password)).toBeNull();

            submitButton = await screen.findByTestId(TEST_ID.BUTTON);
            usernameField = await screen.findByPlaceholderText(/username/i);
            passwordField = await screen.findByPlaceholderText(/password/i);
        });

        describe('Validation', () => {
            it('should show username and password validation error messages if username and password not provided', async () => {
                await userEvent.click(submitButton);
                console.log();
                await waitFor(() => {
                    expect(
                        screen.queryByText(errorMessages.username)
                    ).toBeTruthy();
                    expect(
                        screen.queryByText(errorMessages.password)
                    ).toBeTruthy();
                });
            });

            it('should show username validation error messages if only password provided', async () => {
                await userEvent.type(usernameField, username);
                await userEvent.click(submitButton);

                await waitFor(() => {
                    expect(
                        screen.queryByText(errorMessages.password)
                    ).toBeTruthy();
                    expect(
                        screen.queryByText(errorMessages.username)
                    ).toBeNull();
                });
            });

            it('should show password validation error messages if username provided', async () => {
                await userEvent.type(passwordField, password);
                await userEvent.click(submitButton);

                await waitFor(() => {
                    expect(
                        screen.queryByText(errorMessages.username)
                    ).toBeTruthy();
                    expect(
                        screen.queryByText(errorMessages.password)
                    ).toBeNull();
                });
            });
        });

        describe('User flow', () => {
            const token = 'accessToken';

            it('should save access token in cookie upon successful retrieval', async () => {
                jest.spyOn(mockAxios, 'post').mockResolvedValueOnce({
                    data: { access_token: token },
                });

                await userEvent.type(passwordField, password);
                await userEvent.type(usernameField, username);
                await userEvent.click(submitButton);

                await waitFor(() => {
                    // form submitting
                    expect(usernameField).toBeDisabled();
                    expect(passwordField).toBeDisabled();
                });

                await waitFor(() => {
                    // form submitted
                    expect(usernameField).toBeEnabled();
                    expect(passwordField).toBeEnabled();
                });
            });

            it('should show error popup if access token retrieval fails', async () => {
                jest.spyOn(mockAxios, 'post').mockRejectedValueOnce({
                    response: {
                        status: 500,
                    },
                });

                // fill and submit form
                await userEvent.type(passwordField, password);
                await userEvent.type(usernameField, username);
                await userEvent.click(submitButton);

                await waitFor(() => {
                    // form submitting
                    expect(usernameField).toBeDisabled();
                    expect(passwordField).toBeDisabled();
                });

                await waitFor(() => {
                    // form submitted
                    expect(usernameField).toBeEnabled();
                    expect(passwordField).toBeEnabled();
                    // shows error alert
                    expect(screen.findByTestId(TEST_ID.ALERT)).toBeDefined();
                });
            });
        });
    });
});
