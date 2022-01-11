import React from 'react';

import queryClient from 'common/config/reactQueryClient.config';
import { UserProvider } from 'common/context/authContext';
import { Auth } from 'components';
import { Home, Login, MyBookings, NewBooking } from 'pages';
import { QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

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
    return (
        <QueryClientProvider client={queryClient}>
            <UserProvider>
                <BrowserRouter>
                    <Routes>{getRoutes()}</Routes>
                </BrowserRouter>
            </UserProvider>
        </QueryClientProvider>
    );
}

export default App;
