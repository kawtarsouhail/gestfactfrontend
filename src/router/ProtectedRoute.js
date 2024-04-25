import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const isAuthenticated = () => {
    return localStorage.getItem('auth_token') !== null;
  };

 // return isAuthenticated ? children : <Navigate to="/" />;

  return isAuthenticated() ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;


/*import { createBrowserRouter } from "react-router-dom";
import React from 'react';
import Login from '../component/login';
import PageNotFound from '../pages/pageNotFound';
import Layout from "../layout/layout";
import Invoice from "../component/Invoice";
import MainVisualiser from "../component/MainVisualiser";
import Table from "../component/Table";
import Visualiser from "../component/Visualiser";
import GestionCompte from "../component/GestionCompte"
import ProtectedRoute from './ProtectedRoute';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/invoice',
        element: <ProtectedRoute><Invoice /></ProtectedRoute>
      },
      {
        path: '/MainVisualiser',
        element: <ProtectedRoute><MainVisualiser /></ProtectedRoute>
      },
      {
        path: '/Table',
        element: <ProtectedRoute><Table /></ProtectedRoute>
      },
      {
        path: '/Visualiser',
        element: <ProtectedRoute><Visualiser /></ProtectedRoute>
      },
      {
        path: '/GestionCompte',
        element: <ProtectedRoute><GestionCompte /></ProtectedRoute>
      },
    ]
  },
  {
    path: '*',
    element: <PageNotFound />
  },
  {
    path: '/',
    element: <Login />
  },
]);
*/