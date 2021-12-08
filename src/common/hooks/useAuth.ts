import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAccessToken, isJWTValid } from 'common/utils';

function useAuth(component: Component) {
    const navigate = useNavigate();
    const token = getAccessToken();
    return token && isJWTValid(token) ? component : navigate('/login');
}
export default useAuth;
