import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isSessionValid } from "../utils/authUtils";
import { logout } from "../redux/authSlice";

const SessionManager = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    const checkSession = () => {
      // Only check if user is authenticated
      if (isAuthenticated && !isSessionValid()) {
        // Clear auth state
        dispatch(logout());
        // Redirect to login
        navigate("/login");
      }
    };

    // Check immediately on mount
    checkSession();

    // Check every 1 minute (60 seconds)
    const interval = setInterval(checkSession, 60 * 1000);

    return () => clearInterval(interval);
  }, [dispatch, navigate, isAuthenticated]);

  return null;
};

export default SessionManager;
