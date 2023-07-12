import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useUser } from './userContext';

function LoginRoute() {
  const userCon = useUser();

  return userCon.user ? <Navigate to="/dashboard" /> : <Outlet />;
}

export default LoginRoute;