import { apiFetch } from "./apiClient";

// PUBLIC_INTERFACE
export const userService = {
  /** Login to the system and receive token and user info. */
  async login({ email, password }) {
    const data = await apiFetch("/auth/login", { method: "POST", body: { email, password } });
    return data || { token: null, user: null };
  },
  /** Get current user profile. */
  async me({ token } = {}) {
    const data = await apiFetch("/auth/me", { token });
    return data || null;
  },
  /** List users (admin). */
  async list({ token } = {}) {
    const data = await apiFetch("/admin/users", { token });
    return data || { items: [], total: 0 };
  },
  /** Update user role (admin). */
  async updateRole(userId, role, { token } = {}) {
    const data = await apiFetch(`/admin/users/${userId}/role`, { method: "PUT", token, body: { role } });
    return data || { success: false };
  },
};
