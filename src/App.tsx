import React from 'react';
import { Home, Login } from 'pages';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import useAuth, { UserProvider } from 'common/hooks/useAuth';

const routes = [
    { path: '/login', element: <Login />, isProtected: false },
    { path: '/', element: <Home />, isProtected: true },
];

function App() {
    return (
        <UserProvider>
            <BrowserRouter>
                <Routes>
                    {routes.map((route) => {
                        const { path, element, isProtected } = route;
                        return (
                            <Route
                                key={path}
                                path={path}
                                element={
                                    isProtected ? useAuth(element) : element
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
