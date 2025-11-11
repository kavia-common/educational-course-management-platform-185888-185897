import React from "react";

// PUBLIC_INTERFACE
export default function Card({ children, style, title, footer }) {
  /** Card surface with shadow and rounded corners. */
  return (
    <section className="card" role="region" aria-label={title || "Card"} style={style}>
      {title ? <h3 style={{ marginTop: 0 }}>{title}</h3> : null}
      <div>{children}</div>
      {footer ? <div style={{ marginTop: 12 }}>{footer}</div> : null}
    </section>
  );
}
