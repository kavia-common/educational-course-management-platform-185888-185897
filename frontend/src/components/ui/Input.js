import React from "react";

// PUBLIC_INTERFACE
export default function Input({ label, id, ...props }) {
  /** Input with label and focus outline. */
  return (
    <div style={{ display: "grid", gap: 6 }}>
      {label ? <label htmlFor={id}>{label}</label> : null}
      <input id={id} className="input" {...props} />
    </div>
  );
}
