import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.svg";
import "./Layout.css";

// PUBLIC_INTERFACE
export default function Sidebar() {
  /** App sidebar navigation. */
  return (
    <aside className="sidebar" aria-label="Sidebar navigation">
      <div className="brand">
        <img src={logo} alt="Logo" />
        <strong>EduManage</strong>
      </div>
      <nav className="nav">
        <NavLink to="/dashboard">📊 Dashboard</NavLink>
        <NavLink to="/courses">📚 Courses</NavLink>
        <NavLink to="/enroll">📝 Enrollment</NavLink>
        <div style={{ marginTop: 10, fontSize: 12, opacity: 0.7, padding: "6px 12px" }}>Admin</div>
        <NavLink to="/admin/users">👤 Users</NavLink>
        <NavLink to="/admin/courses">🛠️ Courses</NavLink>
      </nav>
    </aside>
  );
}
