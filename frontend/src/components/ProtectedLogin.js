import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedLogin({ isLogged, children }) {
  if (!isLogged) {
    return children;
  }
  return <Navigate to="/mynotes" replace />;
}

export default ProtectedLogin;
