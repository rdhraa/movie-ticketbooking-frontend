import React from 'react';
import { useSelector } from "react-redux";
import { Outlet, Navigate } from 'react-router-dom';

const AdminProtectedRoute = () => {
  const { isAdminAuth } = useSelector((state) => state.admin);

  if (!isAdminAuth) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};

export default AdminProtectedRoute;
