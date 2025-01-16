<<<<<<< HEAD
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
=======
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
>>>>>>> c9973c7f94f4d329365fbbb2db74be7bcabde679
