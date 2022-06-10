import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  return (
    <>
      {isAuthenticated === true && user.role === "admin" ? (
        <Outlet />
      ) : (
        <Navigate replace to="/login" />
      )}
    </>
  );
};

export default AdminRoute;
