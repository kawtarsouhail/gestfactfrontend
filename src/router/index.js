import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import React from 'react';
import Login from '../component/login';
import PageNotFound from '../pages/pageNotFound';
import Layout from '../layout/layout';
import Invoice from '../component/Invoice';
import MainVisualiser from '../component/MainVisualiser';
import GestionCompte from '../component/GestionCompte';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = () => {
   const cookies = document.cookie.split(';').map(cookie => cookie.trim());
    const authTokenCookie = cookies.find(cookie => cookie.startsWith('auth_token='));
    if (authTokenCookie) {
      const token = authTokenCookie.split('=')[1];
      return true;
    }
    return false;
  };
  return isAuthenticated() ? children : <Navigate to="/" />;
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
    index: true
  },
  {
    path: '/',
    element: <ProtectedRoute><Layout /></ProtectedRoute>,
    children: [
      { path: 'invoice', element: <Invoice /> },
      { path: 'MainVisualiser', element: <MainVisualiser /> },
      { path: 'GestionCompte', element: <GestionCompte /> }
    ]
  },
  { path: '*', element: <PageNotFound /> }
]);
