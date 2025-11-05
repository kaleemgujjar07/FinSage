import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { Card, Typography } from "@mui/material";
import { motion } from "framer-motion";

// Sample data
const data = [
  { name: "Jan", value: 200 },
  { name: "Feb", value: 400 },
  { name: "Mar", value: 150 },
  { name: "Apr", value: 300 },
  { name: "May", value: 500 },
  { name: "Jun", value: 700 },
];

// Custom Tooltip with MUI
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <Card
        sx={{
          p: 1.5,
          bgcolor: "white",
          borderRadius: 2,
          boxShadow: 4,
          textAlign: "center",
        }}
      >
        <Typography variant="subtitle2" color="textSecondary">
          {payload[0].payload.name}
        </Typography>
        <Typography variant="h6" color="primary">
          {payload[0].value}
        </Typography>
      </Card>
    );
  }
  return null;
};

export default function Chart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <ResponsiveContainer width="100%" height={350}>
        <AreaChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          {/* Gradient Fill */}
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1976d2" stopOpacity={0.8} />
              <stop offset="50%" stopColor="#9c27b0" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#ff4081" stopOpacity={0.1} />
            </linearGradient>
            {/* Shadow for area */}
            <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="5" stdDeviation="4" floodColor="#1976d2" />
            </filter>
          </defs>

          {/* Grid */}
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />

          {/* Axes */}
          <XAxis dataKey="name" tick={{ fill: "#555" }} />
          <YAxis tick={{ fill: "#555" }} />

          {/* Tooltip */}
          <Tooltip content={<CustomTooltip />} />

          {/* Area */}
          <Area
            type="natural"
            dataKey="value"
            stroke="#1976d2"
            strokeWidth={3}
            fill="url(#colorValue)"
            fillOpacity={1}
            isAnimationActive={true}
            animationDuration={1500}
            activeDot={{ r: 8, stroke: "#ff4081", strokeWidth: 2 }}
            style={{ filter: "url(#shadow)" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
