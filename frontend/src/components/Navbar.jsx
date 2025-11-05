import React from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { text: "Dashboard", link: "/" },
  { text: "Wallet", link: "/wallet" },
];

export default function Navbar({ title }) {
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width:900px)");

  return (
    <Box
      component={motion.div}
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1200,
        backdropFilter: "blur(12px)",
        background: "linear-gradient(90deg, #1976d2, #1e3a8a)",
        p: { xs: 2, md: 2.5 },
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
        color: "white",
      }}
    >
      {/* Left: Always show ARC USDC Wallet */}
      <Typography
        variant="h6"
        fontWeight="bold"
        sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}
      >
        {title}
      </Typography>

      {/* Right side: FinSage AI above 900px, links under 900px */}
      {!isMobile ? (
        <Typography
          variant="subtitle2"
          sx={{ opacity: 0.9, fontSize: { xs: "0.75rem", md: "0.9rem" } }}
        >
          FinSage AI 💼
        </Typography>
      ) : (
        <Box sx={{ display: "flex", gap: 3 }}>
          {navLinks.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              <Typography
                component={Link}
                to={item.link}
                sx={{
                  color: location.pathname === item.link ? "#ffd700" : "white",
                  textDecoration: "none",
                  fontWeight: location.pathname === item.link ? "bold" : "medium",
                  "&:hover": { color: "#ffec99" },
                }}
              >
                {item.text}
              </Typography>
            </motion.div>
          ))}
        </Box>
      )}
    </Box>
  );
}
