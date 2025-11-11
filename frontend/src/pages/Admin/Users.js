import React, { useEffect, useState } from "react";
import Table from "../../components/ui/Table";
import Badge from "../../components/ui/Badge";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import { userService } from "../../services/userService";
import { useAuth } from "../../state/authSlice";

// PUBLIC_INTERFACE
export default function AdminUsers() {
  /** Admin Users management placeholder with role update. */
  const { state: auth } = useAuth();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    let cancel = false;
    async function load() {
      const data = await userService.list({ token: auth.token });
      if (!cancel) setRows(data.items || []);
    }
    load();
    return () => { cancel = true; };
  }, [auth.token]);

  const cols = [
    { header: "Name", key: "name" },
    { header: "Email", key: "email" },
    { header: "Role", key: "role", render: (r) => <Badge color={r.role === "admin" ? "secondary" : "primary"}>{r.role || "student"}</Badge> },
    { header: "Actions", key: "actions", render: (r) => <Button variant="ghost" onClick={() => alert(`Update role for ${r.name}`)}>Update Role</Button> },
  ];

  return (
    <Card title="Users">
      <Table columns={cols} data={rows} />
    </Card>
  );
}
