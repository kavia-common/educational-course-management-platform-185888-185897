import { apiFetch } from "./apiClient";

// PUBLIC_INTERFACE
export const enrollmentService = {
  /** List my enrollments. */
  async myEnrollments({ token } = {}) {
    const data = await apiFetch("/enrollments/me", { token });
    return data || { items: [] };
  },
  /** List available courses to enroll. */
  async available({ token } = {}) {
    const data = await apiFetch("/enrollments/available", { token });
    return data || { items: [] };
  },
  /** Enroll in a course. */
  async enroll(courseId, { token } = {}) {
    const data = await apiFetch(`/enrollments/${courseId}/enroll`, { method: "POST", token });
    return data || { success: false };
  },
  /** Drop a course. */
  async drop(courseId, { token } = {}) {
    const data = await apiFetch(`/enrollments/${courseId}/drop`, { method: "POST", token });
    return data || { success: false };
  },
};
