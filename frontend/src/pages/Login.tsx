import React, { useState } from "react";
import { Box, Card, Typography, TextField, Button, ThemeProvider, createTheme } from "@mui/material";
import { motion } from "framer-motion";
import theme from "../themeGUEST";
import { useNavigate } from "react-router-dom";

const secondaryTheme = createTheme({
  ...theme,
  palette: {
    ...theme.palette,
    primary: theme.palette.secondary,
  },
});

const Login: React.FC = () => {
  const navigate = useNavigate(); // <-- dentro del componente
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      navigate("/dashboardMenu"); // redirige al Dashboard
    }, 300); // pequeña demora para animación de carga
  };

  return (
    <ThemeProvider theme={secondaryTheme}>
      <Box
        sx={{
          width: "100vw",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "#061224",
          p: 2,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card
            sx={{
              p: 4,
              width: 360,
              bgcolor: "#0c1a33",
              borderRadius: 3,
              boxShadow: "0 8px 32px rgba(6,182,212,0.2)",
            }}
          >
            <Typography
              variant="h5"
              sx={{ textAlign: "center", color: "#22d3ee", fontWeight: 700, mb: 3 }}
            >
              Iniciar Sesión
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                label="Usuario"
                name="email"
                value={formData.email}
                onChange={handleChange}
                variant="outlined"
                size="small"
                fullWidth
                InputProps={{
                  sx: {
                    color: "#fff",
                    "& .MuiOutlinedInput-notchedOutline": { borderColor: "#22d3ee" },
                    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#06b6d4" },
                  },
                }}
              />
              <TextField
                label="Contraseña"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                variant="outlined"
                size="small"
                fullWidth
                InputProps={{
                  sx: {
                    color: "#fff",
                    "& .MuiOutlinedInput-notchedOutline": { borderColor: "#22d3ee" },
                    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#06b6d4" },
                  },
                }}
              />
              <Button
                onClick={handleLogin}
                disabled={loading}
                sx={{
                  mt: 1,
                  py: 1.25,
                  background: "linear-gradient(135deg, #06b6d4 0%, #22d3ee 100%)",
                  color: "#fff",
                  fontWeight: 600,
                  boxShadow: "0 6px 24px rgba(6,182,212,0.3)",
                  "&:hover": {
                    boxShadow: "0 8px 32px rgba(6,182,212,0.5)",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                {loading ? "Cargando..." : "Iniciar Sesión"}
              </Button>
            </Box>
          </Card>
        </motion.div>
      </Box>
    </ThemeProvider>
  );
};

export default Login;
