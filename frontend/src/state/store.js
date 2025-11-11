import React from "react";
import { AuthProvider } from "./authSlice";
import { CourseProvider } from "./courseSlice";

// PUBLIC_INTERFACE
export function AppProviders({ children }) {
  /** Combine global providers for the application. */
  return (
    <AuthProvider>
      <CourseProvider>{children}</CourseProvider>
    </AuthProvider>
  );
}
