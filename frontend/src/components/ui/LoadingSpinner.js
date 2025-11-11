import React from "react";

// PUBLIC_INTERFACE
export default function LoadingSpinner({ label = "Loading..." }) {
  /** Minimal loading indicator. */
  return (
    <div role="status" aria-live="polite" style={{ display: "flex", gap: 10, alignItems: "center" }}>
      <span style={{ width: 14, height: 14, border: "2px solid #2563EB", borderTopColor: "transparent", borderRadius: "50%", display: "inline-block", animation: "spin 1s linear infinite" }} />
      <span>{label}</span>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
