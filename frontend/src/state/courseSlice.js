import React, { createContext, useContext, useMemo, useReducer } from "react";

const initial = {
  courses: [],
  selectedCourse: null,
  filters: { q: "" },
  pagination: { page: 1, pageSize: 10, total: 0 },
  enrollment: { items: [] },
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_COURSES":
      return { ...state, courses: action.payload.items, pagination: { ...state.pagination, total: action.payload.total } };
    case "SET_SELECTED":
      return { ...state, selectedCourse: action.payload };
    case "SET_FILTERS":
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case "SET_PAGE":
      return { ...state, pagination: { ...state.pagination, page: action.payload } };
    case "SET_ENROLLMENT":
      return { ...state, enrollment: { items: action.payload.items || [] } };
    default:
      return state;
  }
}

const CourseContext = createContext({
  state: initial,
  setCourses: () => {},
  setSelected: () => {},
  setFilters: () => {},
  setPage: () => {},
  setEnrollment: () => {},
});

// PUBLIC_INTERFACE
export function useCourses() {
  /** Access course state and actions. */
  return useContext(CourseContext);
}

// PUBLIC_INTERFACE
export function CourseProvider({ children }) {
  /** Provides course listing, selection, filters, pagination, and enrollment state. */
  const [state, dispatch] = useReducer(reducer, initial);

  const api = useMemo(
    () => ({
      state,
      setCourses: (payload) => dispatch({ type: "SET_COURSES", payload }),
      setSelected: (payload) => dispatch({ type: "SET_SELECTED", payload }),
      setFilters: (payload) => dispatch({ type: "SET_FILTERS", payload }),
      setPage: (page) => dispatch({ type: "SET_PAGE", payload: page }),
      setEnrollment: (payload) => dispatch({ type: "SET_ENROLLMENT", payload }),
    }),
    [state]
  );

  return <CourseContext.Provider value={api}>{children}</CourseContext.Provider>;
}
