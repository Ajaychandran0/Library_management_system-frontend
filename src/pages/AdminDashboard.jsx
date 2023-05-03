import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function DashboardContent() {
  const navigate = useNavigate();

  const { admin } = useSelector(state => state.admin);

  useEffect(() => {
    if (!admin) {
      navigate("/admin/login");
    }
  }, [admin, navigate]);

  return <>Admin Dashboard</>;
}

export default function AdminDashboard() {
  return <DashboardContent />;
}
