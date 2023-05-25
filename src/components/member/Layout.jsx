import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";

import { Outlet } from "react-router-dom";
import Header from "./Header/Header";

const mdTheme = createTheme({
  palette: {
    primary: {
      main: "#162051",
    },
    danger: {
      main: "#D11A2A",
    },
    shade: {
      main: "#bbb",
    },
  },
});

const Layout = () => {
  return (
    <>
      <ThemeProvider theme={mdTheme}>
        <Box sx={{ overflow: "hidden" }}>
          <CssBaseline />
          <Header />
          <Box
            component="main"
            sx={{
              overflow: "auto",
              marginTop: "3.5rem",
              mb: "3rem",
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
