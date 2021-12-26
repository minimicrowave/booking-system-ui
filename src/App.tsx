import React from 'react';

import { UserProvider } from 'common/context/authContext';
import { Auth } from 'components';
import { Home, Login, MyBookings, NewBooking } from 'pages';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const routes = [
    { path: '/login', element: <Login />, isProtected: false },
    { path: '/', element: <Home />, isProtected: true },
    { path: '/bookings', element: <MyBookings />, isProtected: true },
    { path: '/bookings/new', element: <NewBooking />, isProtected: true },
];

function App() {
    return (
        <UserProvider>
            <BrowserRouter>
                <Routes>
                    {routes.map(({ path, element, isProtected }) => {
                        return (
                            <Route
                                key={path}
                                path={path}
                                element={
                                    isProtected ? (
                                        <Auth>{element}</Auth>
                                    ) : (
                                        element
                                    )
                                }
                            />
                        );
                    })}
                </Routes>
            </BrowserRouter>
        </UserProvider>
    );
}

export default App;
