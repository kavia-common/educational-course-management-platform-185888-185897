import React from "react";

// PUBLIC_INTERFACE
export default function Select({ label, id, children, ...props }) {
  /** Select with label and focus outline. */
  return (
    <div style={{ display: "grid", gap: 6 }}>
      {label ? <label htmlFor={id}>{label}</label> : null}
      <select id={id} className="select" {...props}>
        {children}
      </select>
    </div>
  );
}
