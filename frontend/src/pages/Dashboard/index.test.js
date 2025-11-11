import { render, screen } from "@testing-library/react";
import Dashboard from ".";
import { ThemeProvider } from "../../components/common/ThemeProvider";

test("renders dashboard KPIs", () => {
  render(<ThemeProvider><Dashboard /></ThemeProvider>);
  expect(screen.getByText(/Active Courses/i)).toBeInTheDocument();
});
