import React, { createContext, useContext, useMemo, useReducer } from "react";
import { getEnv } from "../utils/env";

// PUBLIC_INTERFACE
export function useAuth() {
  /** Access auth state and actions. */
  return useContext(AuthContext);
}

const initialState = (() => {
  const stored = localStorage.getItem("auth");
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      // ignore
    }
  }
  return {
    isAuthenticated: false,
    token: null,
    user: null,
    role: null,
    flags: {},
    experiments: false,
  };
})();

function reducer(state, action) {
  switch (action.type) {
    case "LOGIN": {
      const next = {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        user: action.payload.user,
        role: action.payload.role || action.payload.user?.role || "student",
      };
      localStorage.setItem("auth", JSON.stringify(next));
      return next;
    }
    case "LOGOUT": {
      const next = {
        isAuthenticated: false,
        token: null,
        user: null,
        role: null,
        flags: {},
        experiments: false,
      };
      localStorage.setItem("auth", JSON.stringify(next));
      return next;
    }
    default:
      return state;
  }
}

const AuthContext = createContext({ state: initialState, login: () => {}, logout: () => {} });

// PUBLIC_INTERFACE
export function AuthProvider({ children }) {
  /** Provides authentication state and actions with localStorage persistence. */
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    flags: getEnv().featureFlags,
    experiments: getEnv().experimentsEnabled,
  });

  const api = useMemo(
    () => ({
      state,
      login: (payload) => dispatch({ type: "LOGIN", payload }),
      logout: () => dispatch({ type: "LOGOUT" }),
    }),
    [state]
  );

  return <AuthContext.Provider value={api}>{children}</AuthContext.Provider>;
}
