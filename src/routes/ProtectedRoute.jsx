import React from "react";
import { Navigate } from "react-router-dom";
import { isSessionValid } from "../utils/authUtils";

const ProtectedRoute = ({ children }) => {
  const valid = isSessionValid();
  return valid ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
