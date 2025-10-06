// src/pages/Login.tsx
import React, { useState } from "react";
import { Box, Card, Typography, TextField, Button, Divider, ThemeProvider, createTheme } from "@mui/material";
import { motion } from "framer-motion";
import theme from "../themeGUEST";
import { useNavigate } from "react-router-dom";
import Galaxy from "../components/Galaxy";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import LogoHawaHP from '../assets/Logo-HawaHP.png';
// por pruebas
const secondaryTheme = createTheme({
  ...theme,
  palette: {
    ...theme.palette,
    primary: { main: "#ffffff" },
  },
});

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "user@example.com", password: "123456" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => navigate("/dashboardMenu"), 300);
  };

  return (
    <ThemeProvider theme={secondaryTheme}>
            {/* logo*/}
            <Box
              component="img"
              src={LogoHawaHP}
              alt="Logo HawaHP"
              sx={{
                position: 'absolute',
                top: 24,
                left: 24,
                width: 160,
                height: 'auto',
                zIndex: 2,
              }}
            />
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          position: "relative",
          overflow: "hidden",
          bgcolor: "black",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 2,
        }}
      >
        {/* Galaxy Background */}
        <Box sx={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0 }}>
          <Galaxy
            mouseRepulsion
            mouseInteraction
            density={1.5}
            glowIntensity={0.5}
            saturation={0.8}
            hueShift={240}
          />
        </Box>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ zIndex: 1, width: "100%", maxWidth: 360 }}
        >
          <Card
            sx={{
              p: 4,
              borderRadius: 3,
              background: "rgba(12,26,51,0.6)", // glass effect
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.2)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {/* Welcome Text */}
            <Box sx={{ textAlign: "center", mb: 2 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: "#fff" }}>
                Welcome Back
              </Typography>
              <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)" }}>
                Log in to access your space
              </Typography>
            </Box>

            {/* Inputs */}
            <TextField
              label="Username"
              name="email"
              value={formData.email}
              onChange={handleChange}
              variant="outlined"
              size="small"
              fullWidth
              InputProps={{
                startAdornment: <AccountCircleIcon sx={{ color: "#fff", mr: 1 }} />,
                sx: {
                  color: "#fff",
                  "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.6)" },
                  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#fff" },
                },
              }}
              InputLabelProps={{ sx: { color: "rgba(255,255,255,0.7)" } }}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              variant="outlined"
              size="small"
              fullWidth
              InputProps={{
                startAdornment: <LockIcon sx={{ color: "#fff", mr: 1 }} />,
                sx: {
                  color: "#fff",
                  "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.6)" },
                  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#fff" },
                },
              }}
              InputLabelProps={{ sx: { color: "rgba(255,255,255,0.7)" } }}
            />

            {/* Forgot Password */}
            <Typography
              variant="body2"
              sx={{ color: "rgba(255,255,255,0.7)", textAlign: "right", cursor: "pointer", fontSize: 12 }}
            >
              Forgot password?
            </Typography>

            {/* Login Button */}
            <Button
              onClick={handleLogin}
              disabled={loading}
              sx={{
                mt: 1,
                py: 1.25,
                background: "linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)",
                color: "#000",
                fontWeight: 600,
                borderRadius: 2,
                boxShadow: "0 6px 24px rgba(255,255,255,0.3)",
                "&:hover": {
                  boxShadow: "0 8px 32px rgba(255,255,255,0.5)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              {loading ? "Loading..." : "Log In"}
            </Button>

            {/* Divider */}
            <Divider sx={{ borderColor: "rgba(255,255,255,0.3)", my: 1 }}>or</Divider>

            {/* Social Login */}
            <Button
              fullWidth
              variant="outlined"
              sx={{
                color: "#fff",
                borderColor: "rgba(255,255,255,0.6)",
                "&:hover": {
                  borderColor: "#fff",
                  backgroundColor: "rgba(255,255,255,0.05)",
                },
              }}
            >
              Continue with Google
            </Button>

            {/* Sign Up */}
            <Typography
              variant="body2"
              sx={{ textAlign: "center", color: "rgba(255,255,255,0.7)", mt: 1, fontSize: 12 }}
            >
              Don't have an account?{" "}
              <span style={{ fontWeight: 600, cursor: "pointer", color: "#fff" }}>Sign Up</span>
            </Typography>
          </Card>
        </motion.div>
      </Box>
    </ThemeProvider>
  );
};

export default Login;