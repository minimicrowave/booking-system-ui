import Cookies from 'js-cookie';

import {
    clearAccessToken,
    getAccessToken,
    getSubject,
    isJWTValid,
    setAccessToken,
} from '.';

describe('Utils', () => {
    const accessToken = 'test';

    describe('getAccessToken()', () => {
        it('should return access token stored in cookies', () => {
            jest.spyOn(Cookies, 'get').mockReturnValueOnce(accessToken as any);
            expect(getAccessToken()).toBe(accessToken);
        });
    });

    describe('setAccessToken()', () => {
        it('should store access token in cookies', () => {
            const cookiesSetHandler = jest.fn();
            jest.spyOn(Cookies, 'set').mockImplementationOnce(
                cookiesSetHandler
            );
            setAccessToken(accessToken);
            expect(cookiesSetHandler).toBeCalledTimes(1);
        });
    });

    describe('clearAccessToken()', () => {
        it('should store access token in cookies', () => {
            const cookiesRemoveHandler = jest.fn();
            jest.spyOn(Cookies, 'remove').mockImplementationOnce(
                cookiesRemoveHandler
            );
            clearAccessToken();
            expect(cookiesRemoveHandler).toBeCalledTimes(1);
        });
    });

    describe('isJWTValid()', () => {
        it('should return false if invalid JWT', () => {
            expect(isJWTValid('')).toBe(false);
        });

        it('should return false if expired JWT', () => {
            expect(
                isJWTValid(
                    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE2Mzg5ODc4NzQsImV4cCI6MTIzODk5MTQ3NH0.kvaplJEjrTDd4-3jEEVazpo0n8GXNGHAAUpnmTZFTJs'
                )
            ).toBe(false);
        });

        it('should return true if valid JWT', () => {
            expect(
                isJWTValid(
                    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJKb2huIERvZSIsImlhdCI6MTYzODk4Nzg3NCwiZXhwIjo4ODM4OTkxNDc0fQ.fivq38p-v9f9TFKNsAl9t80vLjGace_Dap8Nocqw5RM'
                )
            ).toBe(true);
        });
    });

    describe('getSubject()', () => {
        it('should return null if invalid JWT', () => {
            expect(getSubject('')).toBeUndefined();
        });

        it('should return null if there is no subject', () => {
            expect(
                getSubject(
                    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE2Mzg5ODc4NzQsImV4cCI6MTIzODk5MTQ3NH0.kvaplJEjrTDd4-3jEEVazpo0n8GXNGHAAUpnmTZFTJs'
                )
            ).toBeUndefined();
        });

        it('should return subject if valid JWT', () => {
            expect(
                getSubject(
                    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJKb2huIERvZSIsImlhdCI6MTYzODk4Nzg3NCwiZXhwIjo4ODM4OTkxNDc0fQ.fivq38p-v9f9TFKNsAl9t80vLjGace_Dap8Nocqw5RM'
                )
            ).toBe('John Doe');
        });
    });
});
