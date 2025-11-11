import React, { useState } from "react";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { userService } from "../../services/userService";
import { useAuth } from "../../state/authSlice";
import { useNavigate } from "react-router-dom";

// PUBLIC_INTERFACE
export default function Login() {
  /** Basic login page using userService and auth context. */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    const res = await userService.login({ email, password });
    if (!res || !res.token) {
      setErr("Login failed. Backend may be unavailable.");
      return;
    }
    login({ token: res.token, user: res.user, role: res.user?.role });
    navigate("/dashboard");
  };

  return (
    <div style={{ display: "grid", placeItems: "center", minHeight: "100vh", padding: 16 }}>
      <Card title="Login">
        <form onSubmit={submit} style={{ display: "grid", gap: 12, minWidth: 320 }}>
          <Input id="email" label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Input id="password" label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          {err ? <div style={{ color: "var(--color-error)" }}>{err}</div> : null}
          <Button type="submit">Sign In</Button>
        </form>
      </Card>
    </div>
  );
}
