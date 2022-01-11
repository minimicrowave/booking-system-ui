import React, { createContext, useState } from 'react';

import {
    clearAccessToken,
    getAccessToken,
    getSubject,
    isJWTValid,
    setAccessToken,
} from 'common/utils';

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
                setToken: (token: string, callback?: Function) => {
                    setToken(token);
                    setAccessToken(token);
                    setUserId(getSubject(token));
                    callback && callback();
                },
                removeToken,
                validateToken,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
