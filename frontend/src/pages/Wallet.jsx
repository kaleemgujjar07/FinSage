import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  CircularProgress,
  useMediaQuery,
  Container,
} from "@mui/material";
import { motion } from "framer-motion";
import { getBalance, sendUSDCWithMetaMask } from "../utils/arc";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NAVBAR_HEIGHT = 64;
const SIDEBAR_WIDTH = 240;

export default function Wallet() {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState(null);
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);

  const isMobile = useMediaQuery("(max-width:900px)");

  const fetchBalance = async () => {
    if (!address) {
      toast.error("Enter your wallet address first!", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }
    setLoading(true);
    try {
      const b = await getBalance(address);
      setBalance(b);
      toast.success(`💸 Balance fetched: ${b} USDC`, { position: "top-right", autoClose: 3000 });
    } catch (err) {
      toast.error("❌ Failed to fetch balance", { position: "top-right", autoClose: 3000 });
    } finally {
      setLoading(false);
    }
  };

  const sendTx = async () => {
    if (!to || !amount) {
      toast.error("Enter recipient address and amount!", { position: "top-right", autoClose: 3000 });
      return;
    }
    setSending(true);
    try {
      const hash = await sendUSDCWithMetaMask(to, amount);
      toast.success(`✅ Transaction sent: ${hash}`, { position: "top-right", autoClose: 4000 });
      setTo("");
      setAmount("");
    } catch (err) {
      toast.error("❌ Transaction failed", { position: "top-right", autoClose: 4000 });
    } finally {
      setSending(false);
    }
  };

  return (
    <Box sx={{ display: "flex", bgcolor: "#f0f4f8", minHeight: "100vh" }}>
      {!isMobile && <Sidebar width={SIDEBAR_WIDTH} />}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: !isMobile ? `${SIDEBAR_WIDTH}px` : 0,
          pt: `${NAVBAR_HEIGHT}px`,
          px: { xs: 2, md: 4 },
          width: "100%",
        }}
      >
        <Navbar title="ARC USDC Wallet" />

        <Container maxWidth="md" sx={{ mt: 4 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 120 }}
              whileHover={{ scale: 1.02, boxShadow: "0px 20px 40px rgba(0,0,0,0.1)" }}
            >
              <Paper
                elevation={6}
                sx={{
                  p: { xs: 3, md: 5 },
                  borderRadius: 4,
                  backdropFilter: "blur(16px)",
                  background: "linear-gradient(145deg, rgba(255,255,255,0.85) 0%, rgba(224,242,254,0.75) 100%)",
                  transition: "all 0.3s ease",
                }}
              >
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  gutterBottom
                  sx={{ textAlign: "center", mb: 3 }}
                >
                  💰 ARC USDC Wallet
                </Typography>

                <TextField
                  fullWidth
                  label="Your Wallet Address"
                  variant="outlined"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  sx={{
                    mb: 3,
                    "& .MuiOutlinedInput-root.Mui-focused": {
                      boxShadow: "0 0 8px rgba(25, 118, 210, 0.3)",
                      borderColor: "#1976d2",
                    },
                  }}
                />

                <motion.div whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 200 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={fetchBalance}
                    disabled={loading}
                    sx={{ py: 1.2, fontWeight: "bold", borderRadius: 2 }}
                  >
                    {loading ? <CircularProgress size={24} color="inherit" /> : "Check Balance"}
                  </Button>
                </motion.div>

                {balance !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <Typography
                      variant="body1"
                      align="center"
                      sx={{
                        mt: 3,
                        fontWeight: "medium",
                        color: "success.main",
                        fontSize: "1.2rem",
                      }}
                    >
                      💸 Balance: {balance} USDC
                    </Typography>
                  </motion.div>
                )}

                <Box sx={{ mt: 5 }}>
                  <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                    Send USDC
                  </Typography>

                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Recipient Address"
                        variant="outlined"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Amount"
                        variant="outlined"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                      />
                    </Grid>
                  </Grid>

                  <motion.div whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 200 }}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="success"
                      onClick={sendTx}
                      disabled={sending}
                      sx={{
                        mt: 3,
                        py: 1.3,
                        fontWeight: "bold",
                        borderRadius: 2,
                        boxShadow: "0 8px 20px rgba(0,128,0,0.2)",
                        
                      }}
                    >
                      {sending ? <CircularProgress size={24} color="inherit" /> : "Send USDC"}
                    </Button>
                  </motion.div>
                </Box>
              </Paper>
            </motion.div>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
}
