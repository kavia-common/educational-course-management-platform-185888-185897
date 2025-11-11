# Frontend – Educational Course Management Platform

This React application provides the user interface for students, instructors, and administrators to interact with the learning management system. It follows a modern “Ocean Professional” theme with blue primary and amber secondary accents, subtle shadows, and rounded corners.

## Project Overview and Ocean Professional Theme Summary

The frontend is a lightweight React app that uses vanilla CSS and a minimal component set to deliver a responsive, accessible UI.

- Application theme: Ocean Professional
- Primary color: #2563EB (blue)
- Secondary color: #F59E0B (amber)
- Error color: #EF4444 (red)
- Background: #f9fafb
- Surface: #ffffff
- Text: #111827
- Dark mode: toggle via ThemeProvider, driven by [data-theme="dark"] CSS variables

Theme tokens are implemented as CSS variables in src/components/layout/Layout.css and src/index.css. The ThemeProvider persists the selected theme in localStorage and applies a data-theme attribute on the html element.

## Getting Started

Prerequisites:
- Node.js 16+ and npm

Install dependencies:
- npm install

Development server (port 3000):
- npm start
- Open http://localhost:3000

Run tests:
- npm test

Production build:
- npm run build
- Outputs to build/

## Environment Variables and Usage

Environment variables are read at build time (Create React App convention, prefixed with REACT_APP_). The app centralizes environment access in src/utils/env.js and the API client in src/services/apiClient.js.

Supported variables:
- REACT_APP_API_BASE: Preferred API base URL. Example: https://api.example.com or /api
- REACT_APP_BACKEND_URL: Fallback API base if REACT_APP_API_BASE is not set
- REACT_APP_FRONTEND_URL: Public origin of the frontend (optional)
- REACT_APP_WS_URL: WebSocket base URL (optional)
- REACT_APP_NODE_ENV: Node environment override (defaults to process.env.NODE_ENV)
- REACT_APP_ENABLE_SOURCE_MAPS: Not consumed in code; use CRA build flags if needed
- REACT_APP_PORT: Not consumed by CRA directly; use tooling/docker to map ports
- REACT_APP_TRUST_PROXY: Not used in frontend (server-side concern)
- REACT_APP_LOG_LEVEL: debug | info | warn | error (defaults to debug in dev, warn in prod)
- REACT_APP_HEALTHCHECK_PATH: Optional API path for health check pings (e.g., /healthz)
- REACT_APP_FEATURE_FLAGS: JSON object string of feature flags (e.g., {"betaBanner":true})
- REACT_APP_EXPERIMENTS_ENABLED: true | false

How they are used in code:
- getEnv (src/utils/env.js)
  - Chooses apiBase from REACT_APP_API_BASE or REACT_APP_BACKEND_URL, defaulting to /api
  - Parses REACT_APP_FEATURE_FLAGS JSON, sets experimentsEnabled
  - Exposes nodeEnv, logLevel, wsUrl, frontendUrl, healthcheckPath
- logger (src/utils/logger.js)
  - Gates console output by REACT_APP_LOG_LEVEL
- apiClient (src/services/apiClient.js)
  - Builds URLs using apiBase and attaches Authorization headers when token is provided
  - Supports healthcheck via getEnv().healthcheckPath

Example .env.local:
REACT_APP_API_BASE=https://lms-api.local
REACT_APP_LOG_LEVEL=debug
REACT_APP_HEALTHCHECK_PATH=/healthz
REACT_APP_FEATURE_FLAGS={"newNavbar":true}
REACT_APP_EXPERIMENTS_ENABLED=true

## Routing Map

Routes are defined via createBrowserRouter in src/router/index.js and composed with the app Layout.

- / → Dashboard
- /dashboard → Dashboard
- /courses → Course list
- /courses/:courseId → Course detail
- /enroll → Enrollment
- /admin/users → Admin: users (protected via ProtectedRoute with roles=["admin"])
- /admin/courses → Admin: courses (protected)
- /login → Login
- /logout → Logout (performs logout then redirects)
- * → 404 Not Found

## Architecture

### Routing and Layout
- Router: src/router/index.js uses createBrowserRouter and RouterProvider
- Layout shell: src/components/layout/Layout.js composes Sidebar, Topbar, and content area
- Protected routes: src/components/common/ProtectedRoute.js enforces authentication and role-based access

### UI Components
- src/components/ui: Button, Card, Input, Select, Table, Modal, LoadingSpinner, Badge, EmptyState
- Styling tokens and base styles in src/components/layout/Layout.css and src/index.css

### State
- src/state/authSlice.js
  - Context-based auth store: isAuthenticated, token, user, role, flags, experiments
  - Actions: login, logout; persisted in localStorage
  - Flags and experiments are hydrated from getEnv()
- src/state/courseSlice.js
  - Context-based store: courses, selectedCourse, filters, pagination, enrollment
  - Actions: setCourses, setSelected, setFilters, setPage, setEnrollment
- src/state/store.js
  - AppProviders combines AuthProvider and CourseProvider

### Services
- src/services/apiClient.js
  - apiFetch(path, options): JSON fetch with base URL and auth header support
  - healthcheck(): optional health endpoint probe
- src/services/courseService.js
  - list, getById, enroll, unenroll
- src/services/userService.js
  - login, me, list, updateRole
- src/services/enrollmentService.js
  - myEnrollments, available, enroll, drop
- src/services/adminService.js
  - listCourses, createCourse, updateCourse, deleteCourse

### Utils and Hooks
- src/utils/env.js: central environment resolution
- src/utils/logger.js: log level–aware logger
- src/hooks/useDebounce.js: input debouncing
- src/hooks/usePagination.js: simple pagination helpers

## Configuring API Base and Auth Headers

To point the frontend at a backend:
1) Prefer REACT_APP_API_BASE
- Example: REACT_APP_API_BASE=https://api.my-backend.com

2) Fallback REACT_APP_BACKEND_URL
- If REACT_APP_API_BASE is unset, the app uses REACT_APP_BACKEND_URL instead.

3) Default
- If neither are set, the app uses /api, which is suitable when reverse proxying from the same origin.

Behavior in code:
- apiClient resolves the base URL from getEnv().apiBase and strips trailing slashes.
- apiFetch attaches Authorization: Bearer <token> automatically when a token is passed by services.
- Auth tokens are stored in authSlice state after login. Services fetch methods accept an options object { token } which should be derived from useAuth().state.token.

Example usage:
import { apiFetch } from "./services/apiClient";
const data = await apiFetch("/courses", { token: auth.state.token });

CORS and same-origin notes:
- When using an absolute REACT_APP_API_BASE pointing to another origin, ensure the backend allows CORS from your frontend origin.
- When proxying via /api under the same origin, configure your web server or dev proxy accordingly.

## Theming and Customization

Theme tokens (CSS variables):
- Defined in src/components/layout/Layout.css and mirrored for dark mode via [data-theme="dark"] overrides.
- Key tokens: --color-primary, --color-secondary, --color-error, --color-bg, --color-surface, --color-text, --radius, --shadow-*

Dark mode:
- The ThemeProvider (src/components/common/ThemeProvider.js) stores the theme in localStorage and applies data-theme on document.documentElement.
- The Topbar includes a toggle button to switch between light and dark modes.

Customizing the look:
- Update variables in Layout.css for global changes.
- Component structure is minimal and CSS-only, making it straightforward to restyle buttons, inputs, tables, and cards.

## Development Notes and Future Work

- This app intentionally avoids heavy UI frameworks to keep the bundle small and the design system transparent.
- Add form validation and error surfaces for service calls where needed.
- Expand ProtectedRoute to support more granular permissions if the backend exposes them.
- Consider adding react-query or SWR if data fetching patterns become more complex.
- Introduce integration tests that mock API endpoints to validate flows end-to-end.

Sources:
- src/utils/env.js
- src/services/apiClient.js
- src/router/index.js
- src/state/authSlice.js
- src/state/courseSlice.js
- src/state/store.js
- src/components/common/ThemeProvider.js
- src/components/layout/Layout.css
- package.json
