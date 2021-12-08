import React from 'react';
import { Home, Login } from 'pages';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import useAuth, { UserProvider } from 'common/hooks/useAuth';
import MyBookings from 'pages/myBookings/MyBookings';

const routes = [
    { path: '/login', element: <Login />, isProtected: false },
    { path: '/', element: <Home />, isProtected: true },
    { path: '/bookings', element: <MyBookings />, isProtected: true },
];

function App() {
    return (
        <UserProvider>
            <BrowserRouter>
                <Routes>
                    {routes.map((route) => {
                        const { path, element, isProtected } = route;
                        console.log('ai');
                        return (
                            <Route key={path} path={path} element={element} />
                        );
                    })}
                </Routes>
            </BrowserRouter>
        </UserProvider>
    );
}

export default App;
