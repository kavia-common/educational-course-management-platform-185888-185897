import { getEnv } from "./env";

const LEVELS = ["debug", "info", "warn", "error"];
const noop = () => {};

/**
 * Simple logger with level gating based on env.
 */
function createLogger() {
  const { logLevel } = getEnv();
  const minIndex = LEVELS.indexOf(logLevel);
  const isEnabled = (lvl) => LEVELS.indexOf(lvl) >= (minIndex >= 0 ? minIndex : 1);

  // PUBLIC_INTERFACE
  const logger = {
    /** Logger debug */
    debug: isEnabled("debug") ? console.debug.bind(console, "[DEBUG]") : noop,
    /** Logger info */
    info: isEnabled("info") ? console.info.bind(console, "[INFO]") : noop,
    /** Logger warn */
    warn: isEnabled("warn") ? console.warn.bind(console, "[WARN]") : noop,
    /** Logger error */
    error: isEnabled("error") ? console.error.bind(console, "[ERROR]") : noop,
  };

  return logger;
}

export const logger = createLogger();
