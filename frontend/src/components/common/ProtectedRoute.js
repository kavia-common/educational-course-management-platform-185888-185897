import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../state/authSlice";

/**
 * Restricts access based on authentication and role.
 */
// PUBLIC_INTERFACE
export function ProtectedRoute({ roles }) {
  /** Guarded route for role-based access. */
  const { state } = useAuth();
  const isAuthed = state.isAuthenticated;
  const hasRole = !roles || (state.role && roles.includes(state.role));

  if (!isAuthed) {
    return <Navigate to="/login" replace />;
  }
  if (!hasRole) {
    return <Navigate to="/dashboard" replace />;
  }
  return <Outlet />;
}
