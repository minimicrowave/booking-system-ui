import React, { ReactElement, useContext } from 'react';

import { UserContext } from 'common/context/authContext';
import { isJWTValid } from 'common/utils';
import { NavBar } from 'components';
import { Navigate } from 'react-router-dom';

function Auth({ children }: { children: ReactElement<any, any> }) {
    const { token, validateToken } = useContext(UserContext);
    validateToken();
    return token && isJWTValid(token) ? (
        <>
            <NavBar />
            {children}
        </>
    ) : (
        <Navigate to="/login" />
    );
}

export default Auth;
