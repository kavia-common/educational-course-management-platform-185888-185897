import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import "./Layout.css";

// PUBLIC_INTERFACE
export default function Layout({ children }) {
  /** Composes the app shell with sidebar and topbar. */
  return (
    <div className="app-shell">
      <Sidebar />
      <Topbar />
      <main className="content" role="main">
        <div className="container">{children}</div>
      </main>
    </div>
  );
}
