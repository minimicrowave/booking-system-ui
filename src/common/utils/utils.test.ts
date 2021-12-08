import Cookies from 'js-cookie';
import { clearAccessToken, getAccessToken, setAccessToken } from '.';

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
});
