import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isSessionValid } from "../utils/authUtils";
import { useDispatch } from "react-redux";

const SessionManager = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkSession = () => {
      if (!isSessionValid()) {
        navigate("/login");
      }
    };

    const interval = setInterval(checkSession, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, [dispatch, navigate]);

  return null;
};

export default SessionManager;
