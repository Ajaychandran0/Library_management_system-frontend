import Box from "@mui/material/Box";
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

  return (
    <>
      <Box
        component="main"
        sx={{
          backgroundColor: theme =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          overflow: "auto",
          marginTop: "6rem",
        }}
      ></Box>
    </>
  );
}

export default function AdminDashboard() {
  return <DashboardContent />;
}
