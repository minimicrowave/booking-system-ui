import React from 'react';
import {
    render,
    screen,
    waitFor,
    waitForElementToBeRemoved,
} from '@testing-library/react';
import { Login } from 'pages';
import userEvent from '@testing-library/user-event';
import * as bookingService from 'common/services/bookingService';
import * as utils from 'common/utils';
import { createAxiosResponse } from 'test/helpers';
import { act } from 'react-dom/test-utils';

describe('<Login/>', () => {
    const formId = 'bsui-login-form';
    const inputId = 'bsui-form-input';
    const buttonId = 'bsui-form-button';
    const alertId = 'bsui-alert';
    const logoId = 'bsui-logo';

    const username = 'username';
    const password = 'password';

    beforeEach(() => {
        render(<Login />);
    });

    it('should succesfully render page with login form and logo', async () => {
        const form = await screen.findByTestId(formId);
        const logo = await screen.findAllByTestId(logoId);
        const inputs = await screen.findAllByTestId(inputId);
        const submitButton = await screen.findByTestId(buttonId);

        expect(form).toBeTruthy();
        expect(logo).toBeTruthy();
        expect(submitButton).toBeTruthy();
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

            submitButton = await screen.findByTestId(buttonId);
            usernameField = await screen.findByPlaceholderText(/username/i);
            passwordField = await screen.findByPlaceholderText(/password/i);
        });

        describe('Validation', () => {
            it('should show username and passsword validation error messages if username and password not provided', async () => {
                await userEvent.click(submitButton);
                await waitFor(() => {
                    expect(
                        screen.queryByText(errorMessages.username)
                    ).toBeTruthy();
                    expect(
                        screen.queryByText(errorMessages.password)
                    ).toBeTruthy();
                });
            });

            it('should show username validation error messages if username provided', async () => {
                await userEvent.type(passwordField, password);
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

            it('should show password validation error messages if password provided', async () => {
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
                const setAccessTokenSpy = jest.fn();

                jest.spyOn(
                    bookingService,
                    'getAccessToken'
                ).mockResolvedValueOnce(
                    createAxiosResponse({ access_token: token })
                );

                jest.spyOn(utils, 'setAccessToken').mockImplementationOnce(
                    setAccessTokenSpy
                );

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
                });

                expect(setAccessTokenSpy).toHaveBeenCalledTimes(1);
                expect(setAccessTokenSpy).toHaveBeenCalledWith(token);
            });

            it('should show error popup if access token retrieval fails', async () => {
                jest.spyOn(
                    bookingService,
                    'getAccessToken'
                ).mockRejectedValueOnce({
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
                    expect(screen.findByTestId(alertId)).toBeDefined();
                });
            });
        });
    });
});
