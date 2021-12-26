import React, {
    ReactElement,
    useState,
    createContext,
    useContext,
} from 'react';

import {
    getAccessToken,
    setAccessToken,
    isJWTValid,
    clearAccessToken,
    getSubject,
} from 'common/utils';
import { Navigate } from 'react-router-dom';

export const UserContext = createContext<any>({
    token: getAccessToken(),
    userId: undefined,
    setToken: (token: string) => {},
    removeToken: () => {},
    validateToken: () => {},
});

export const UserProvider = ({ children }: any) => {
    // User is the name of the "data" that gets stored in context
    const [token, setToken] = useState<string | undefined>(getAccessToken());
    const [userId, setUserId] = useState<number | undefined>(getSubject(token));

    function removeToken() {
        setToken('');
        setUserId(undefined);
        clearAccessToken();
    }

    function validateToken() {
        if (!token || !isJWTValid(token)) {
            removeToken();
        }
    }

    return (
        <UserContext.Provider
            value={{
                token,
                userId,
                setToken: (token: string) => {
                    setToken(token);
                    setAccessToken(token);
                    setUserId(getSubject(token));
                },
                removeToken,
                validateToken,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

function UseAuth({ children }: { children: ReactElement<any, any> }) {
    const { token, validateToken } = useContext(UserContext);
    validateToken();
    return token && isJWTValid(token) ? children : <Navigate to="/login" />;
}
export default UseAuth;
