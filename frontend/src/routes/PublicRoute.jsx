import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ component: Component }) => {
    const token = localStorage.getItem('token');
    return token ? <Navigate to="/dashboard/customer" /> : <Component />;
};

export default PublicRoute;
