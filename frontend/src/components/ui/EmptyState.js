import React from "react";

// PUBLIC_INTERFACE
export default function EmptyState({ title = "Nothing to show", description = "Try adjusting your filters or come back later.", action }) {
  /** Empty state component for graceful no-data UI. */
  return (
    <div className="empty" role="status" aria-live="polite">
      <div style={{ fontSize: 40, marginBottom: 8 }}>🧭</div>
      <h3 style={{ margin: "6px 0" }}>{title}</h3>
      <p style={{ margin: "6px 0 16px", opacity: 0.8 }}>{description}</p>
      {action || null}
    </div>
  );
}
