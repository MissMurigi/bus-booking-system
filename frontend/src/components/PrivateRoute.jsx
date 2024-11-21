import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ allowedRoles, element, ...rest }) => {
  const user = useSelector(state => state.user);  // Assuming you're storing the user info in Redux

  if (!user || !allowedRoles.includes(user.role)) {
    // If the user is not logged in or does not have the required role, redirect them
    return <Navigate to="/not-authorized" replace />;
  }

  // If the user has the required role, render the component
  return <Route {...rest} element={element} />;
};

export default PrivateRoute;
