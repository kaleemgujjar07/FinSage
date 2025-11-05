import React from "react";
import { Box, Grid, Typography, useMediaQuery, Container } from "@mui/material";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import DashboardCard from "../components/DashboardCard";
import Chart from "../components/Chart";
import { motion } from "framer-motion";

export default function Home() {
  const isMobile = useMediaQuery("(max-width:900px)");
  const sidebarWidth = 240;

  const stats = [
    { title: "Total Wallets", value: "12" },
    { title: "Active Users", value: "8" },
    { title: "Total USDC", value: "$2,450" },
    { title: "Transactions", value: "32" },
  ];

  return (
    <Box sx={{ display: "flex", bgcolor: "#f8fafc", minHeight: "100vh" }}>
      {/* Sidebar */}
      {!isMobile && <Sidebar width={sidebarWidth} />}

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: !isMobile ? `${sidebarWidth}px` : 0, // margin only if sidebar is visible
          p: { xs: 2, md: 4 },
          width: "100%",
        }}
      >
        <Navbar title="FinSage Dashboard" />

        <Container maxWidth="xl" sx={{ mt: 4 }}>
          {/* Welcome Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Typography
              variant="h5"
              gutterBottom
              fontWeight="bold"
              sx={{
                fontSize: { xs: "1.4rem", md: "1.8rem" },
                textShadow: "0 1px 2px rgba(0,0,0,0.08)",
              }}
            >
              Welcome back, Kaleem 👋
            </Typography>
          </motion.div>

          {/* Dashboard Cards Grid */}
          <Grid container spacing={3} sx={{ mt: 1 }}>
            {stats.map((item, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.1 * index,
                    duration: 0.5,
                    type: "spring",
                    stiffness: 100,
                  }}
                >
                  <DashboardCard {...item} />
                </motion.div>
              </Grid>
            ))}
          </Grid>

          {/* Chart Section */}
          <Box sx={{ mt: 6 }}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <Typography
                variant="h6"
                gutterBottom
                fontWeight="bold"
                sx={{
                  color: "#0f172a",
                  mb: 2,
                  fontSize: { xs: "1.1rem", md: "1.3rem" },
                }}
              >
                Transaction Overview
              </Typography>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <Chart />
              </motion.div>
            </motion.div>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
