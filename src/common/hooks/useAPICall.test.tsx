import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import useAPICall from './useAPICall';
import { MemoryRouter } from 'react-router-dom';

describe('useAPICall()', () => {
    const wrapper = {
        wrapper: ({ children }) => <MemoryRouter>{children}</MemoryRouter>,
    };

    it('should be defined', () => {
        const hook = renderHook(() => useAPICall(), wrapper);
        expect(hook).toBeDefined();
    });

    it('should return default state once instantiated', () => {
        const hook = renderHook(() => useAPICall(), wrapper);

        const { isLoading, hasError, response, executeApiCall } =
            hook.result.current;

        expect(isLoading).toBe(false);
        expect(hasError).toBe(false);
        expect(response).toBeUndefined();
        expect(executeApiCall).toBeDefined();
    });

    it('should run through api call events and set loading and success response accordingly', async () => {
        const hook = renderHook(() => useAPICall(), wrapper);
        const data = 'data';
        const apiCall = jest.fn(() => ({ data }));
        const { executeApiCall } = hook.result.current;

        // execute api call
        await act(async () => {
            executeApiCall(apiCall);
        });

        const { isLoading, hasError, response } = hook.result.current;

        expect(isLoading).toBe(false);
        expect(response).toBe(data);
        expect(hasError).toBe(false);

        expect(apiCall).toHaveBeenCalledTimes(1);
    });

    it('should run through api call events and set loading and error response accordingly', async () => {
        const hook = renderHook(() => useAPICall(), wrapper);
        const apiCall = jest.fn(() => {
            // eslint-disable-next-line no-throw-literal
            throw {
                response: {
                    status: 500,
                },
            };
        });

        const { executeApiCall } = hook.result.current;

        // execute api call
        await act(async () => {
            executeApiCall(apiCall);
        });

        const { isLoading, hasError, response } = hook.result.current;

        expect(isLoading).toBe(false);
        expect(response).toBeUndefined();
        expect(hasError).toBe(true);

        expect(apiCall).toHaveBeenCalledTimes(1);
    });
});