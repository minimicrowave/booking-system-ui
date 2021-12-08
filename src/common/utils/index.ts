import { ACCESS_TOKEN_KEY } from 'common/constants';
import Cookies from 'js-cookie';

export function getAccessToken() {
    return Cookies.get(ACCESS_TOKEN_KEY);
}

export function setAccessToken(accessToken: string) {
    Cookies.set(ACCESS_TOKEN_KEY, accessToken);
}
