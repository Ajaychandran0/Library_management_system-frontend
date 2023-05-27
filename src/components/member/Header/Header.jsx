import {
  AppBar,
  Box,
  Button,
  Avatar,
  Container,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import BookIcon from "@mui/icons-material/Book";
import MenuIcon from "@mui/icons-material/Menu";

import { logout, reset } from "../../../features/member/auth/authSlice";
import { pages, settings } from "./headerItems";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { member } = useSelector(state => state.auth);

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = event => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const onLogOut = () => {
    setAnchorElUser(null);
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };
  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <BookIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Link to="/">
            <Typography
              variant="h6"
              noWrap
              component="span"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".1rem",
                color: "#ffffff",
                textDecoration: "none",
              }}
            >
              HORIZON LIBRARY
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map(page => (
                <Link to={page.route} key={page.label}>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page.label}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
          <Link to="/">
            <Typography
              variant="h5"
              noWrap
              component="span"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                fontSize: "1rem",
                letterSpacing: ".1rem",
                color: "#ffffff",
                textDecoration: "none",
              }}
            >
              HORIZON LIBRARY
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1, ml: 5, display: { xs: "none", md: "flex" } }}>
            {pages.map(page => (
              <Link to={page.route} key={page.label}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page.label}
                </Button>
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 1 }}>
                <Avatar alt="Almond Howard" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {member ? (
                settings.map(setting => (
                  <Link to={setting.route} key={setting.label}>
                    <MenuItem
                      onClick={setting.route ? handleCloseUserMenu : onLogOut}
                    >
                      <Typography textAlign="center">
                        {setting.label}
                      </Typography>
                    </MenuItem>
                  </Link>
                ))
              ) : (
                <Link to="/login">
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">Login</Typography>
                  </MenuItem>
                </Link>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
