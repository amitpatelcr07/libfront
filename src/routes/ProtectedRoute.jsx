import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { isSessionValid } from "../utils/authUtils";
import { logout } from "../redux/authSlice";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const valid = isSessionValid();

  useEffect(() => {
    // If session invalid, clear Redux state
    if (!valid) {
      dispatch(logout());
    }
  }, [valid, dispatch]);

  return valid ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
