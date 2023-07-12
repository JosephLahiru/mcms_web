import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useUser } from './userContext';

function PrivateRoute() {
  const userCon = useUser();

  return userCon.user ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;
