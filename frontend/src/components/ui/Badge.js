import React from "react";

// PUBLIC_INTERFACE
export default function Badge({ children, color = "primary" }) {
  /** Pill badge for status or roles. */
  const style = {};
  if (color === "secondary") {
    style.background = "rgba(245,158,11,0.12)";
    style.color = "#B45309";
  }
  if (color === "error") {
    style.background = "rgba(239,68,68,0.12)";
    style.color = "#B91C1C";
  }
  return (
    <span className="badge" style={style}>
      {children}
    </span>
  );
}
