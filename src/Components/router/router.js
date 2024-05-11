import { createBrowserRouter, Navigate } from 'react-router-dom';
import React,{useState,useEffect} from 'react';
import Login from '../Login';
import PageNotFound from '../errors/PageNotFound';
import Layout from '../Header/Layout';
import Invoice from '../Invoice';
import Visualiser from '../Visualiser/Visualiser';
import GestionCompte from '../GestionComptes/GestionCompte';
import Suivi from '../Suivi/Suivi';
import { getToken } from '../router/auth';


const ProtectedRoute = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    setIsAuth(!!token);
    setIsLoading(false); // Met fin au chargement une fois que l'authentification est vérifiée
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // Affiche un message de chargement pendant la vérification de l'authentification
  }

  return isAuth ? children : <Navigate to="/" />;
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
      { path: 'Visualiser', element: <Visualiser /> },
      { path: 'Gestion des Comptes', element: <GestionCompte /> },
      { path: 'Suivi', element: <Suivi /> }
    ]
  },
  { path: '*', element: <PageNotFound /> }
]);
