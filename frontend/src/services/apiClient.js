import { getEnv } from "../utils/env";
import { logger } from "../utils/logger";

/**
 * Fetch wrapper that uses environment-driven base URL and attaches auth headers.
 */
function resolveBaseUrl() {
  const { apiBase } = getEnv();
  return apiBase.replace(/\/+$/, "");
}

// PUBLIC_INTERFACE
export async function apiFetch(path, { method = "GET", headers = {}, body, token, signal } = {}) {
  /** Perform a fetch request using environment-aware base URL and JSON defaults. */
  const base = resolveBaseUrl();
  const url = `${base}${path.startsWith("/") ? path : `/${path}`}`;

  const finalHeaders = {
    "Content-Type": "application/json",
    ...headers,
  };
  if (token) {
    finalHeaders.Authorization = `Bearer ${token}`;
  }

  try {
    const res = await fetch(url, {
      method,
      headers: finalHeaders,
      body: body ? JSON.stringify(body) : undefined,
      signal,
    });

    const contentType = res.headers.get("content-type") || "";
    const isJson = contentType.includes("application/json");
    const data = isJson ? await res.json().catch(() => ({})) : await res.text();

    if (!res.ok) {
      logger.warn("apiFetch non-OK", { url, status: res.status, data });
      throw new Error((data && data.message) || `Request failed with status ${res.status}`);
    }
    return data;
  } catch (err) {
    logger.error("apiFetch error", err);
    // Graceful empty state handling
    return null;
  }
}

// PUBLIC_INTERFACE
export async function healthcheck() {
  /** Optional healthcheck ping using env healthcheck path. Returns boolean or null if not configured. */
  const { healthcheckPath } = getEnv();
  if (!healthcheckPath) return null;
  try {
    const data = await apiFetch(healthcheckPath, { method: "GET" });
    return !!data;
  } catch {
    return false;
  }
}
