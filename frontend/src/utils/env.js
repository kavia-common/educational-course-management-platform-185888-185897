//
// PUBLIC_INTERFACE
export function getEnv() {
  /** Safely read environment variables with sensible defaults for the app. */
  const {
    REACT_APP_API_BASE,
    REACT_APP_BACKEND_URL,
    REACT_APP_FRONTEND_URL,
    REACT_APP_WS_URL,
    REACT_APP_NODE_ENV,
    REACT_APP_LOG_LEVEL,
    REACT_APP_HEALTHCHECK_PATH,
    REACT_APP_FEATURE_FLAGS,
    REACT_APP_EXPERIMENTS_ENABLED,
  } = process.env || {};

  const apiBase = REACT_APP_API_BASE || REACT_APP_BACKEND_URL || "/api";
  const nodeEnv = REACT_APP_NODE_ENV || process.env.NODE_ENV || "development";
  const logLevel = REACT_APP_LOG_LEVEL || (nodeEnv === "production" ? "warn" : "debug");
  const wsUrl = REACT_APP_WS_URL || "";
  const frontendUrl = REACT_APP_FRONTEND_URL || "";
  const healthcheckPath = REACT_APP_HEALTHCHECK_PATH || "";

  let featureFlags = {};
  try {
    featureFlags = REACT_APP_FEATURE_FLAGS ? JSON.parse(REACT_APP_FEATURE_FLAGS) : {};
  } catch {
    featureFlags = {};
  }
  const experimentsEnabled = (REACT_APP_EXPERIMENTS_ENABLED || "").toString().toLowerCase() === "true";

  return {
    apiBase,
    nodeEnv,
    logLevel,
    wsUrl,
    frontendUrl,
    healthcheckPath,
    featureFlags,
    experimentsEnabled,
  };
}
