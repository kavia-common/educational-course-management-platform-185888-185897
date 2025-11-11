import React from "react";
import EmptyState from "../components/ui/EmptyState";
import Button from "../components/ui/Button";
import { Link } from "react-router-dom";

// PUBLIC_INTERFACE
export default function NotFound() {
  /** Fallback not found page. */
  return (
    <div style={{ display: "grid", placeItems: "center", minHeight: "60vh" }}>
      <EmptyState
        title="Page not found"
        description="The page you are looking for does not exist."
        action={<Link to="/dashboard" className="btn">Go to Dashboard</Link>}
      />
    </div>
  );
}
