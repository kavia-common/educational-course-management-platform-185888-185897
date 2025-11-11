import React, { useEffect, useState } from "react";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import EmptyState from "../../components/ui/EmptyState";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import { useCourses } from "../../state/courseSlice";
import { useAuth } from "../../state/authSlice";
import { courseService } from "../../services/courseService";
import { useDebounce } from "../../hooks/useDebounce";
import { usePagination } from "../../hooks/usePagination";
import { Link } from "react-router-dom";

// PUBLIC_INTERFACE
export default function CourseList() {
  /** Course listing with search, filters placeholders, and pagination. */
  const { state, setCourses, setFilters, setPage } = useCourses();
  const { state: auth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [localQ, setLocalQ] = useState(state.filters.q || "");
  const debouncedQ = useDebounce(localQ, 400);
  const { page, pageSize, totalPages, next, prev } = usePagination(state.pagination.total, state.pagination.page, state.pagination.pageSize);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      const data = await courseService.list({ q: debouncedQ, page, pageSize, token: auth.token });
      if (!cancelled) {
        setCourses({ items: data.items || [], total: data.total || 0 });
        setFilters({ q: debouncedQ });
        setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [debouncedQ, page, pageSize, auth.token, setCourses, setFilters]);

  useEffect(() => { setPage(page); }, [page, setPage]);

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <Card title="Browse Courses">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 220px 140px", gap: 12, alignItems: "end" }}>
          <Input id="q" label="Search" value={localQ} onChange={(e) => setLocalQ(e.target.value)} placeholder="Search courses..." />
          <Select id="cat" label="Category">
            <option value="">All</option>
            <option value="dev">Development</option>
            <option value="design">Design</option>
          </Select>
          <Button onClick={() => setLocalQ("")} variant="ghost">Reset</Button>
        </div>
      </Card>

      {loading ? (
        <LoadingSpinner label="Loading courses..." />
      ) : state.courses.length === 0 ? (
        <EmptyState title="No courses found" description="Try adjusting your search or filters." />
      ) : (
        <div style={{ display: "grid", gap: 12 }}>
          {state.courses.map((c) => (
            <Card key={c.id} title={c.title || "Untitled Course"} footer={<Link to={`/courses/${c.id}`} className="btn">View details</Link>}>
              <p style={{ margin: 0, opacity: 0.8 }}>{c.description || "No description provided."}</p>
            </Card>
          ))}
          <div style={{ display: "flex", gap: 8, justifyContent: "space-between" }}>
            <Button variant="ghost" onClick={prev} disabled={page <= 1}>Previous</Button>
            <div>Page {page} of {totalPages}</div>
            <Button variant="ghost" onClick={next} disabled={page >= totalPages}>Next</Button>
          </div>
        </div>
      )}
    </div>
  );
}
