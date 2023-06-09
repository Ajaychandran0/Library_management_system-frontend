import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";

import { Outlet } from "react-router-dom";
import Header from "./Header/Header";

const mdTheme = createTheme({
  palette: {
    primary: {
      main: "#162051",
      light: "#003b93",
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
              height: "91.6vh",
              marginTop: "3.5rem",
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
