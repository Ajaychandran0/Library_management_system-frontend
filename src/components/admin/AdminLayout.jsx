import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";

import AdminHeader from "./header/Header";
import Navbar from "./navbar/Navbar";
import { Outlet } from "react-router-dom";
import { useState } from "react";

const mdTheme = createTheme({
  palette: {
    primary: {
      main: "#162051",
    },
    danger: {
      main: "#D11A2A",
    },
  },
});

const Layout = () => {
  const [open, setOpen] = useState(true);

  return (
    <>
      <ThemeProvider theme={mdTheme}>
        <Box
          sx={{
            display: "flex",
            overflow: "hidden",
            height: "100vh",
          }}
        >
          <CssBaseline />
          <AdminHeader open={open} setOpen={setOpen} />
          <Navbar open={open} setOpen={setOpen} />

          <Box
            component="main"
            sx={{
              marginLeft: () => (open ? "15rem" : "4.5rem"),
              flexGrow: 1,
              overflow: "scroll",
              marginTop: "4rem",
              marginBottom: "-1rem",
              padding: "2.5rem",
            }}
          >
            <Outlet />
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default Layout;
