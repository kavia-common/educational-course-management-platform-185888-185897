import { apiFetch } from "./apiClient";

// PUBLIC_INTERFACE
export const adminService = {
  /** Admin: list courses. */
  async listCourses({ token } = {}) {
    const data = await apiFetch("/admin/courses", { token });
    return data || { items: [] };
  },
  /** Admin: create a course. */
  async createCourse(course, { token } = {}) {
    const data = await apiFetch("/admin/courses", { method: "POST", token, body: course });
    return data || { success: false };
  },
  /** Admin: update a course. */
  async updateCourse(id, course, { token } = {}) {
    const data = await apiFetch(`/admin/courses/${id}`, { method: "PUT", token, body: course });
    return data || { success: false };
  },
  /** Admin: delete a course. */
  async deleteCourse(id, { token } = {}) {
    const data = await apiFetch(`/admin/courses/${id}`, { method: "DELETE", token });
    return data || { success: false };
  },
};
