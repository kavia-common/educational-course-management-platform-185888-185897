import React, { useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import EmptyState from "../../components/ui/EmptyState";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import { useAuth } from "../../state/authSlice";
import { enrollmentService } from "../../services/enrollmentService";

// PUBLIC_INTERFACE
export default function Enroll() {
  /** Enrollment page: list my enrollments and available courses. */
  const { state: auth } = useAuth();
  const [loading, setLoading] = useState(true);
  const [mine, setMine] = useState([]);
  const [available, setAvailable] = useState([]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      const m = await enrollmentService.myEnrollments({ token: auth.token });
      const a = await enrollmentService.available({ token: auth.token });
      if (!cancelled) {
        setMine(m.items || []);
        setAvailable(a.items || []);
        setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [auth.token]);

  const handleEnroll = async (id) => {
    await enrollmentService.enroll(id, { token: auth.token });
    setMine((prev) => [...prev, available.find((c) => c.id === id)].filter(Boolean));
    setAvailable((prev) => prev.filter((c) => c.id !== id));
  };

  const handleDrop = async (id) => {
    await enrollmentService.drop(id, { token: auth.token });
    setAvailable((prev) => [...prev, mine.find((c) => c.id === id)].filter(Boolean));
    setMine((prev) => prev.filter((c) => c.id !== id));
  };

  if (loading) return <LoadingSpinner label="Loading enrollments..." />;

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <Card title="My Enrollments">
        {mine.length === 0 ? (
          <EmptyState title="No enrollments yet" description="Find a course below to get started." />
        ) : (
          <ul style={{ paddingLeft: 18 }}>
            {mine.map((c) => (
              <li key={c.id} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0" }}>
                <span>{c.title}</span>
                <Button variant="ghost" onClick={() => handleDrop(c.id)}>Drop</Button>
              </li>
            ))}
          </ul>
        )}
      </Card>
      <Card title="Available Courses">
        {available.length === 0 ? (
          <EmptyState title="No available courses" description="Please check back later." />
        ) : (
          <ul style={{ paddingLeft: 18 }}>
            {available.map((c) => (
              <li key={c.id} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0" }}>
                <span>{c.title}</span>
                <Button onClick={() => handleEnroll(c.id)}>Enroll</Button>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
