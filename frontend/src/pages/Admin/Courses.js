import React, { useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import Table from "../../components/ui/Table";
import Button from "../../components/ui/Button";
import Modal from "../../components/ui/Modal";
import { adminService } from "../../services/adminService";
import { useAuth } from "../../state/authSlice";

// PUBLIC_INTERFACE
export default function AdminCourses() {
  /** Admin Course CRUD UI placeholder with modal create/edit. */
  const { state: auth } = useAuth();
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: "", description: "" });

  const load = async () => {
    const data = await adminService.listCourses({ token: auth.token });
    setRows(data.items || []);
  };

  useEffect(() => { load(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const cols = [
    { header: "Title", key: "title" },
    { header: "Description", key: "description" },
    { header: "Actions", key: "act", render: (r) => (
      <div style={{ display: "flex", gap: 8 }}>
        <Button variant="ghost" onClick={() => { setEditing(r); setForm({ title: r.title, description: r.description }); setOpen(true); }}>Edit</Button>
        <Button variant="ghost" onClick={async () => { await adminService.deleteCourse(r.id, { token: auth.token }); load(); }}>Delete</Button>
      </div>
    )},
  ];

  const submit = async () => {
    if (editing) {
      await adminService.updateCourse(editing.id, form, { token: auth.token });
    } else {
      await adminService.createCourse(form, { token: auth.token });
    }
    setOpen(false);
    setEditing(null);
    setForm({ title: "", description: "" });
    await load();
  };

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <Card title="Courses" footer={<Button onClick={() => setOpen(true)}>Create Course</Button>}>
        <Table columns={cols} data={rows} />
      </Card>
      <Modal open={open} onClose={() => { setOpen(false); setEditing(null); }} title={editing ? "Edit Course" : "Create Course"}
        footer={<Button onClick={submit}>{editing ? "Save" : "Create"}</Button>}>
        <div style={{ display: "grid", gap: 8 }}>
          <label>Title</label>
          <input className="input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <label>Description</label>
          <textarea className="input" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </div>
      </Modal>
    </div>
  );
}
