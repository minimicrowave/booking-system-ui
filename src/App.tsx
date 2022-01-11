import React from 'react';

import getQueryClient from 'common/config/reactQueryClient.config';
import { UserProvider } from 'common/context/authContext';
import { Auth } from 'components';
import { Home, Login, MyBookings, NewBooking } from 'pages';
import { QueryClientProvider } from 'react-query';
import { Route, Routes, useNavigate } from 'react-router-dom';

const routes = [
    { path: '/login', element: <Login />, isProtected: false },
    { path: '/', element: <Home />, isProtected: true },
    { path: '/bookings', element: <MyBookings />, isProtected: true },
    { path: '/bookings/new', element: <NewBooking />, isProtected: true },
];

function getRoutes(): React.ReactNode {
    return routes.map(({ path, element, isProtected }) => (
        <Route
            key={path}
            path={path}
            element={isProtected ? <Auth>{element}</Auth> : element}
        />
    ));
}

function App() {
    const navigate = useNavigate();

    return (
        <UserProvider>
            <QueryClientProvider client={getQueryClient(navigate)}>
                <Routes>{getRoutes()}</Routes>
            </QueryClientProvider>
        </UserProvider>
    );
}

export default App;
