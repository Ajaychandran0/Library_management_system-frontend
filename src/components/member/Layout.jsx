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
        <Box sx={{ display: "flex", overflow: "hidden", height: "100vh" }}>
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
