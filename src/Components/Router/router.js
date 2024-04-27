import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import React from 'react';
import Login from '../Login';
import PageNotFound from '../errors/PageNotFound';
import Layout from '../Header/Layout';
import Invoice from '../Invoice';
import MainVisualiser from '../Visualiser/Visualiser';
import GestionCompte from '../GestionComptes/GestionCompte';
import Suivi from '../Suivi/Suivi'

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
      { path: 'Enregistrer', element: <Invoice /> },
      { path: 'Visualiser', element: <MainVisualiser /> },
      { path: 'GestionCompte', element: <GestionCompte /> },
      { path: 'Suivi', element: <Suivi /> }
    ]
  },
  { path: '*', element: <PageNotFound /> }
]);
