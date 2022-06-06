import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { loading, isAuthenticated } = useSelector((state) => state.user);
  return (
    <>
      {!loading && isAuthenticated ? (
        <Outlet />
      ) : (
        <Navigate replace to="/login" />
      )}
    </>
  );
};

export default ProtectedRoute;
