import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";

import AdminHeader from "./header/Header";
import Navbar from "./navbar/Navbar";
import { Outlet } from "react-router-dom";
import { useState } from "react";

const mdTheme = createTheme();

const Layout = () => {
  const [open, setOpen] = useState(true);

  return (
    <>
      <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AdminHeader open={open} setOpen={setOpen} />
          <Navbar open={open} setOpen={setOpen} />
          <main className="App">
            <Box
              component="main"
              sx={{
                // backgroundColor: theme =>
                //   theme.palette.mode === "light"
                //     ? theme.palette.grey[100]
                //     : theme.palette.grey[900],
                flexGrow: 1,
                overflow: "auto",
                margin: "3rem",
                marginTop: "6rem",
                paddingLeft: () => (open ? "15rem" : "10rem"),
                marginRight: () => (open ? "" : "8rem"),
              }}
            >
              <Outlet />
            </Box>
          </main>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default Layout;
