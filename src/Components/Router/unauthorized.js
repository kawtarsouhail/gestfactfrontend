import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/unauthorized.css';
import Visualiser from '../Visualiser/Visualiser';

const UnauthorizedPage = () => {
    return (
        <div className="unauthorized-container">
            <h1>Error 401: Unauthorized</h1>
            <p>You are not authorized to access this page.</p>
            <Link to="/Visualiser">Go back</Link>
        </div>
    );
};

export default UnauthorizedPage;
