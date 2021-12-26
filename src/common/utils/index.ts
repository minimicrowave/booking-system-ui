import { ACCESS_TOKEN_KEY } from 'common/constants/config';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

export function getAccessToken() {
    return Cookies.get(ACCESS_TOKEN_KEY);
}

export function setAccessToken(accessToken: string) {
    Cookies.set(ACCESS_TOKEN_KEY, accessToken);
}

export function clearAccessToken() {
    Cookies.remove(ACCESS_TOKEN_KEY);
}

export function isJWTValid(token: string | undefined) {
    try {
        if (!token) return false;

        const decoded: any = jwtDecode(token);
        return new Date(decoded.exp * 1000) > new Date() && !!decoded.sub;
    } catch (error) {
        return true;
    }
}

export function getSubject(token: string | undefined) {
    try {
        if (!token) return;

        const decoded: any = jwtDecode(token);
        return decoded.sub;
    } catch (error) {
        return;
    }
}
