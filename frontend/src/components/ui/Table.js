import React from "react";

// PUBLIC_INTERFACE
export default function Table({ columns = [], data = [] }) {
  /** Simple responsive table component. */
  return (
    <div style={{ overflowX: "auto" }}>
      <table className="table">
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key || c.header}>{c.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} style={{ textAlign: "center", padding: 20, opacity: 0.7 }}>
                No data
              </td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr key={row.id || idx}>
                {columns.map((c) => (
                  <td key={c.key || c.header}>{typeof c.render === "function" ? c.render(row) : row[c.key]}</td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
