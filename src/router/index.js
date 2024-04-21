import { createBrowserRouter } from "react-router-dom";
import React from 'react';
import Home from '../pages/Home';
import Login from '../component/login';
import PageNotFound from '../pages/pageNotFound';
import Layout from "../layout/layout";
import Admin from "../pages/Admin";
import Invoice from "../component/Invoice";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/admin',
        element: <Admin />
      },
      {
        path: '/invoice',
        element: <Invoice />
      },
     
     
    ]
  },
  {
    path: '*',
    element: <PageNotFound />
  },
  {
    path: '/login',
    element: <Login />
  }
]);