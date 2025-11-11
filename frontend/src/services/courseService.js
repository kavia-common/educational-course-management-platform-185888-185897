import { apiFetch } from "./apiClient";

// PUBLIC_INTERFACE
export const courseService = {
  /** List courses with optional filters and pagination. */
  async list({ q = "", page = 1, pageSize = 10, token } = {}) {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    params.set("page", String(page));
    params.set("pageSize", String(pageSize));
    const data = await apiFetch(`/courses?${params.toString()}`, { token });
    return data || { items: [], total: 0 };
  },
  /** Get a course by id. */
  async getById(id, { token } = {}) {
    const data = await apiFetch(`/courses/${id}`, { token });
    return data || null;
  },
  /** Enroll in a course. */
  async enroll(id, { token } = {}) {
    const data = await apiFetch(`/courses/${id}/enroll`, { method: "POST", token });
    return data || { success: false };
  },
  /** Unenroll from a course. */
  async unenroll(id, { token } = {}) {
    const data = await apiFetch(`/courses/${id}/unenroll`, { method: "POST", token });
    return data || { success: false };
  },
};
