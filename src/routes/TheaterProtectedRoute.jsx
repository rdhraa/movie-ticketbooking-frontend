import React from 'react';
import { useSelector } from "react-redux";
import { Outlet, Navigate } from 'react-router-dom';

const TheaterProtectedRoute = () => {
  const { isTheaterAuth } = useSelector((state) => state.theater);

  if (!isTheaterAuth) {
    return <Navigate to="/theater/login" replace />;
  }

  return <Outlet />;
};

export default TheaterProtectedRoute;
