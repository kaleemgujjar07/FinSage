import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  useMediaQuery,
  useTheme,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const NAVBAR_HEIGHT = 64;

const menuItems = [
  { text: "Dashboard", icon: <DashboardIcon />, link: "/" },
  { text: "Wallet", icon: <AccountBalanceWalletIcon />, link: "/wallet" },
];

export default function Sidebar() {
  const location = useLocation();
  const theme = useTheme();
  const isDesktop = useMediaQuery("(min-width:900px)");
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleDrawer = () => setMobileOpen(!mobileOpen);

  // Full sidebar for desktop
  const desktopDrawer = (
    <Drawer
      variant="permanent"
      sx={{
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          backgroundColor: "#1e293b",
          color: "white",
          borderRight: "1px solid rgba(255,255,255,0.1)",
          mt: `${NAVBAR_HEIGHT}px`,
          width: 250,
          p: 1,
        },
      }}
      open
    >
      <List sx={{ mt: 2 }}>
        {menuItems.map((item, i) => {
          const isActive = location.pathname === item.link;

          return (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200, damping: 12 }}
            >
              <ListItemButton
                component={Link}
                to={item.link}
                sx={{
                  mb: 1,
                  borderRadius: 2,
                  backgroundColor: isActive ? "rgba(255,255,255,0.15)" : "transparent",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.1)",
                    boxShadow: "0 4px 12px rgba(255,255,255,0.1)",
                  },
                  transition: "all 0.2s ease",
                }}
              >
                <ListItemIcon
                  sx={{
                    color: isActive ? "#3b82f6" : "white",
                    minWidth: 40,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <motion.div
                    whileHover={{ rotate: 10 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  >
                    {item.icon}
                  </motion.div>
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontWeight: isActive ? "bold" : "medium",
                    color: isActive ? "#3b82f6" : "white",
                  }}
                />
              </ListItemButton>
            </motion.div>
          );
        })}
      </List>
    </Drawer>
  );

  // Mobile icon-only drawer
  const mobileDrawer = (
    <>
      <IconButton
        onClick={toggleDrawer}
        sx={{
          position: "fixed",
          top: 8,
          left: 8,
          zIndex: theme.zIndex.drawer + 1,
          color: "white",
          bgcolor: "#1e293b",
          "&:hover": { bgcolor: "#334155" },
        }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={toggleDrawer}
        sx={{
          "& .MuiDrawer-paper": {
            width: 70,
            backgroundColor: "#1e293b",
            mt: `${NAVBAR_HEIGHT}px`,
          },
        }}
      >
        <List sx={{ mt: 2 }}>
          {menuItems.map((item, i) => (
            <ListItemButton
              key={i}
              component={Link}
              to={item.link}
              onClick={toggleDrawer}
              sx={{
                justifyContent: "center",
                mb: 1,
                borderRadius: 2,
                "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
              }}
            >
              <ListItemIcon sx={{ color: "white", minWidth: "auto" }}>
                {item.icon}
              </ListItemIcon>
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </>
  );

  return isDesktop ? desktopDrawer : mobileDrawer;
}
