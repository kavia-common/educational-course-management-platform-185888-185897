import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../common/ThemeProvider";
import "./Layout.css";

// PUBLIC_INTERFACE
export default function Topbar() {
  /** Top navigation bar with theme toggle and user placeholder. */
  const { theme, setTheme } = useTheme();
  const toggle = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <header className="topbar" role="banner">
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <Link to="/dashboard" className="btn ghost">Home</Link>
        <Link to="/courses" className="btn ghost">Explore</Link>
      </div>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <button className="btn secondary" onClick={toggle} aria-label="Toggle theme">
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
        <Link to="/login" className="btn">Login</Link>
        <Link to="/logout" className="btn ghost">Logout</Link>
      </div>
    </header>
  );
}
