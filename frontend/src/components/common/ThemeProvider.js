import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({
  theme: "light",
  setTheme: () => {},
});

// PUBLIC_INTERFACE
export function useTheme() {
  /** Access theme and toggler. */
  return useContext(ThemeContext);
}

// PUBLIC_INTERFACE
export function ThemeProvider({ children }) {
  /** Provides theme to the app and persists preference. */
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const value = { theme, setTheme };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
