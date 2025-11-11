import React from "react";
import "./components/layout/Layout.css";
import { ThemeProvider } from "./components/common/ThemeProvider";
import { AppProviders } from "./state/store";
import { AppRouter } from "./router";

// PUBLIC_INTERFACE
function App() {
  /** Main app composition: providers + router. */
  return (
    <ThemeProvider>
      <AppProviders>
        <AppRouter />
      </AppProviders>
    </ThemeProvider>
  );
}

export default App;
