import React from "react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

// PUBLIC_INTERFACE
export default function Dashboard() {
  /** Dashboard with KPIs and quick links placeholders. */
  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div className="kpi-grid">
        <Card title="Active Courses">
          <h2>12</h2>
          <p style={{ opacity: 0.7 }}>Courses currently available</p>
        </Card>
        <Card title="My Enrollments">
          <h2>5</h2>
          <p style={{ opacity: 0.7 }}>Courses you're enrolled in</p>
        </Card>
        <Card title="Completion Rate">
          <h2>74%</h2>
          <p style={{ opacity: 0.7 }}>Average across all courses</p>
        </Card>
      </div>
      <Card title="Recent Activity" footer={<Button>View All</Button>}>
        <ul>
          <li>Enrolled in "Advanced React Patterns"</li>
          <li>Completed module "State Management"</li>
          <li>Upcoming: Live session Friday 3 PM</li>
        </ul>
      </Card>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Button>Browse Courses</Button>
        <Button variant="secondary">Continue Learning</Button>
        <Button variant="ghost">Invite a friend</Button>
      </div>
    </div>
  );
}
