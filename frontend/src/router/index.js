import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Dashboard from "../pages/Dashboard";
import CourseList from "../pages/Courses/List";
import CourseDetail from "../pages/Courses/Detail";
import Enroll from "../pages/Enrollment/Enroll";
import AdminUsers from "../pages/Admin/Users";
import AdminCourses from "../pages/Admin/Courses";
import Login from "../pages/Auth/Login";
import Logout from "../pages/Auth/Logout";
import NotFound from "../pages/NotFound";
import { ProtectedRoute } from "../components/common/ProtectedRoute";

/**
 * PUBLIC_INTERFACE
 */
// PUBLIC_INTERFACE
export function AppRouter() {
  /**
   * Register routes for React Router v6 and render via RouterProvider.
   * This component owns the single RouterProvider for the entire app.
   * Ensure no other Router/BrowserRouter wraps this in the tree to avoid nested Router errors.
   */
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Layout>
          <Dashboard />
        </Layout>
      ),
      errorElement: (
        <Layout>
          <NotFound />
        </Layout>
      ),
    },
    {
      path: "/dashboard",
      element: (
        <Layout>
          <Dashboard />
        </Layout>
      ),
    },
    {
      path: "/courses",
      element: (
        <Layout>
          <CourseList />
        </Layout>
      ),
    },
    {
      path: "/courses/:courseId",
      element: (
        <Layout>
          <CourseDetail />
        </Layout>
      ),
    },
    {
      path: "/enroll",
      element: (
        <Layout>
          <Enroll />
        </Layout>
      ),
    },
    {
      path: "/admin",
      element: <ProtectedRoute roles={["admin"]} />,
      children: [
        {
          path: "users",
          element: (
            <Layout>
              <AdminUsers />
            </Layout>
          ),
        },
        {
          path: "courses",
          element: (
            <Layout>
              <AdminCourses />
            </Layout>
          ),
        },
      ],
    },
    { path: "/login", element: <Login /> },
    { path: "/logout", element: <Logout /> },
    { path: "*", element: <NotFound /> },
  ]);

  return <RouterProvider router={router} />;
}
