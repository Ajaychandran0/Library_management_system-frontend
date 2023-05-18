import {
  Toolbar,
  List,
  Divider,
  IconButton,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Collapse,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import { Link } from "react-router-dom";
import { useState } from "react";
import Drawer, {
  activeItem,
  activeNavList,
  navSubText,
  navDrawer,
  navToolbar,
  navList,
} from "./style";
import PropTypes from "prop-types";
import navItems from "./NavItems";

const Navbar = ({ open, setOpen }) => {
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const [expandedItems, setExpandedItems] = useState([]);
  const [activeList, setActiveList] = useState("");
  const [activeElement, setActiveElement] = useState("");

  const handleExpand = item => {
    if (expandedItems.includes(item)) {
      setExpandedItems(expandedItems.filter(i => i !== item));
    } else {
      setExpandedItems([...expandedItems, item]);
    }
  };
  const handleClick = (item, navItem) => {
    setActiveList(navItem);
    setActiveElement(item);
  };

  return (
    <Drawer variant="permanent" open={open} sx={navDrawer}>
      <Toolbar sx={navToolbar}>
        <IconButton onClick={toggleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List component="nav">
        {navItems.map(navItem => (
          <Box key={navItem.id}>
            <Box sx={navList}>
              {activeList === navItem.label ? <Box sx={activeNavList} /> : ""}

              <ListItemButton onClick={() => handleExpand(navItem.label)}>
                <ListItemIcon>{navItem.icon}</ListItemIcon>
                <ListItemText primary={navItem.label} />
              </ListItemButton>
            </Box>
            <Collapse
              in={expandedItems.includes(navItem.label)}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                {navItem.items.map(item => (
                  <Link key={item.id} to={item.route}>
                    <ListItemButton
                      onClick={() => handleClick(item.label, navItem.label)}
                      sx={activeElement === item.label ? activeItem : {}}
                    >
                      <ListItemText primary={item.label} sx={navSubText} />
                    </ListItemButton>
                  </Link>
                ))}
              </List>
            </Collapse>
          </Box>
        ))}
      </List>
    </Drawer>
  );
};

Navbar.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default Navbar;
