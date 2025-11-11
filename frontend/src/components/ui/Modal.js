import React from "react";

// PUBLIC_INTERFACE
export default function Modal({ open, onClose, title, children, footer }) {
  /** Accessible modal dialog with backdrop. */
  if (!open) return null;
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label={title || "Dialog"}>
      <div className="modal">
        {title ? <h3 style={{ marginTop: 0 }}>{title}</h3> : null}
        <div>{children}</div>
        {footer ? <div style={{ marginTop: 16 }}>{footer}</div> : null}
        <button className="btn ghost" onClick={onClose} style={{ marginTop: 12 }}>
          Close
        </button>
      </div>
    </div>
  );
}
