import { Link } from "react-router-dom";

function DashboardContent() {
  return (
    <>
      <Link to="login ">Admin Dashboard</Link>
    </>
  );
}

export default function AdminDashboard() {
  return <DashboardContent />;
}
