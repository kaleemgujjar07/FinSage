import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container, AppBar, Toolbar, Typography, Button } from "@mui/material";
import Home from "./pages/Home";
import Wallet from "./pages/Wallet";

function App() {
  return (
    <Router>
      {/* <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            💸 FinSage
          </Typography>
          <Button color="inherit" href="/">Home</Button>
          <Button color="inherit" href="/wallet">Wallet</Button>
        </Toolbar>
      </AppBar> */}

      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/wallet" element={<Wallet />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
