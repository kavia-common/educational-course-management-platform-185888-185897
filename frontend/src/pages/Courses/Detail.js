import React, { useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import EmptyState from "../../components/ui/EmptyState";
import { useParams } from "react-router-dom";
import { useAuth } from "../../state/authSlice";
import { courseService } from "../../services/courseService";

// PUBLIC_INTERFACE
export default function CourseDetail() {
  /** Course detail page with overview and enroll/unenroll actions. */
  const { courseId } = useParams();
  const { state: auth } = useAuth();
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState(null);
  const [enrolled, setEnrolled] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      const data = await courseService.getById(courseId, { token: auth.token });
      if (!cancelled) {
        setCourse(data);
        setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [courseId, auth.token]);

  const toggleEnroll = async () => {
    if (!auth.isAuthenticated) return;
    if (enrolled) {
      await courseService.unenroll(courseId, { token: auth.token });
      setEnrolled(false);
    } else {
      await courseService.enroll(courseId, { token: auth.token });
      setEnrolled(true);
    }
  };

  if (loading) return <LoadingSpinner label="Loading course..." />;
  if (!course) return <EmptyState title="Course not found" description="This course may be unavailable." />;

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <Card title={course.title || "Untitled Course"}>
        <p style={{ marginTop: 0 }}>{course.description || "No description."}</p>
        <p><strong>Instructor:</strong> {course.instructor || "TBD"}</p>
        <div style={{ display: "flex", gap: 8 }}>
          <Button onClick={toggleEnroll}>{enrolled ? "Unenroll" : "Enroll"}</Button>
          {!auth.isAuthenticated ? <small style={{ opacity: 0.7 }}>Login to manage enrollment.</small> : null}
        </div>
      </Card>
      <Card title="Syllabus">
        <ul>
          <li>Module 1: Introduction</li>
          <li>Module 2: Core Concepts</li>
          <li>Module 3: Advanced Topics</li>
        </ul>
      </Card>
    </div>
  );
}
