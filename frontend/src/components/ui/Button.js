import React from "react";

// PUBLIC_INTERFACE
export default function Button({ children, variant = "primary", ...props }) {
  /** Accessible button using CSS variables. */
  const cls = ["btn"];
  if (variant === "secondary") cls.push("secondary");
  if (variant === "ghost") cls.push("ghost");
  return (
    <button className={cls.join(" ")} {...props}>
      {children}
    </button>
  );
}
