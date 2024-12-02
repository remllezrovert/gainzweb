import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element: Component, ...rest }) => {
  // Check if userData exists in localStorage
  const userData = localStorage.getItem("userData");

  // If no userData, redirect to login page
  if (!userData) {
    return <Navigate to="/login" />;
  }

  // If userData exists, render the component
  return <Component {...rest} />;
};

export default PrivateRoute;
