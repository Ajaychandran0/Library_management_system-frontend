import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Button } from "@mui/material";

import PropTypes from "prop-types";
import AppBar from "./style";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout, reset } from "../../../features/admin/adminSlice";

const AdminHeader = ({ open, setOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const { admin } = useSelector(state => state.admin);

  const onAdminLogout = () => {
    console.log("Admin log");
    dispatch(logout());
    dispatch(reset());
    navigate("/admin");
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };
  return (
    <AppBar position="absolute" open={open}>
      <Toolbar
        sx={{
          pr: "24px", // keep right padding when drawer closed
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer}
          sx={{
            marginRight: "36px",
            ...(open && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}
        >
          Horizon LMS
        </Typography>
        <Button
          variant="text"
          onClick={onAdminLogout}
          sx={{ color: "#fff", fontSize: ".95em" }}
        >
          Logout
        </Button>
        <IconButton color="inherit" sx={{ mx: 1 }}>
          <Badge badgeContent={4} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <IconButton>
          <Avatar style={{ width: "30px", height: "30px" }} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

AdminHeader.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default AdminHeader;
