
import React from 'react';
import { Navigate } from 'react-router-dom';
import unauthorized from "./unauthorized";

const RoleBasedRoute = ({ children, allowedRoles }) => {
    const role = localStorage.getItem('userRole');

    if (allowedRoles.includes(role)) {
        return children;  // Render the component if the role is allowed
    } else {
        return <Navigate to="/unauthorized" />;  // Redirect to an Unauthorized component or any other route
    }
};

export default RoleBasedRoute;
