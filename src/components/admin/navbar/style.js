import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: prop => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(8),
      },
    }),
  },
}));

export const navDrawer = {
  height: "100vh",
  position: "fixed",
};

export const navToolbar = {
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  px: [1],
};

export const activeItem = {
  backgroundColor: theme => theme.palette.grey[400],
  "&:hover": {
    backgroundColor: theme => theme.palette.grey[500],
  },
};

export const navSubText = {
  pl: 7,
};
export const activeNavList = {
  mr: -0.7,
  width: ".4rem",
  height: "3rem",
  backgroundColor: theme => theme.palette.primary.main,
};
export const navList = {
  display: "flex",
};

export default Drawer;
