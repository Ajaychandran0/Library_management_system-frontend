import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";

import { Outlet } from "react-router-dom";
import Header from "./Header";

const mdTheme = createTheme();

const Layout = () => {
  return (
    <>
      <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <Header />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              overflow: "auto",
              marginTop: "4rem",
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
