// Frontend: src/utils/PrivateRoute.js

import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('user');
  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;