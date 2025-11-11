import React, { useEffect } from "react";
import { useAuth } from "../../state/authSlice";
import { Navigate } from "react-router-dom";

// PUBLIC_INTERFACE
export default function Logout() {
  /** Logout action then redirect to login. */
  const { logout } = useAuth();
  useEffect(() => {
    logout();
  }, [logout]);
  return <Navigate to="/login" replace />;
}
