import { Card, CardContent, Typography } from "@mui/material";
import { motion } from "framer-motion";

export default function DashboardCard({ title, value, children }) {
  return (
    <motion.div
      whileHover={{
        scale: 1.06,
        boxShadow: "0px 16px 40px rgba(0,0,0,0.12)",
      }}
      transition={{ type: "spring", stiffness: 250, damping: 12 }}
    >
      <Card
        sx={{
          borderRadius: 3,
          background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
          backgroundSize: "200% 200%",
          animation: "gradientAnimation 4s ease infinite",
          boxShadow: "0px 6px 20px rgba(0,0,0,0.08)",
        }}
      >
        <CardContent>
          <Typography variant="subtitle2" color="text.secondary">
            {title}
          </Typography>

          {value && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            >
              <Typography
                variant="h5"
                fontWeight="bold"
                sx={{ mt: 1, color: "#fff" }}
              >
                {value}
              </Typography>
            </motion.div>
          )}

          {children && (
            <motion.div
              whileHover={{ rotate: 10 }}
              transition={{ type: "spring", stiffness: 300, damping: 12 }}
            >
              {children}
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
