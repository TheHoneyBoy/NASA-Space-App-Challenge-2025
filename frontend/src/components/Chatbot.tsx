import React, { useState, useEffect, useRef } from "react";
import { Box, IconButton, Paper, Typography, TextField, Button, List, ListItem, ListItemText, ThemeProvider, createTheme } from "@mui/material";
import { Satellite, X, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import theme from "../themeGUEST";
import { Send } from "lucide-react";

const cyanTheme = createTheme({
  ...theme,
  palette: {
    ...theme.palette,
    primary: {
      main: "#06b6d4",
      light: "#22d3ee",
      dark: "#0891b2",
    },
  },
});

interface Message {
  sender: "user" | "chaska";
  text: string;
}

const Chatbot: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessage: Message = { sender: "user", text: input };
    setMessages([...messages, newMessage]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "chaska", text: `✨ Chaska dice: Hola! Recibí tu mensaje: "${input}"` },
      ]);
    }, 800);
  };

  // Partículas estilo estrellitas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    const stars = Array.from({ length: 80 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5 + 0.5,
      speed: Math.random() * 0.3 + 0.1
    }));

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      stars.forEach(star => {
        star.y -= star.speed;
        if (star.y < 0) star.y = height;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
      });
      animationId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <ThemeProvider theme={cyanTheme}>
      <Box sx={{ position: "fixed", bottom: 24, right: 24, zIndex: 9999 }}>
        {open && (
          <Paper
            elevation={0}
            sx={{
              width: 360,
              height: 500,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              borderRadius: 4,
              position: "relative",
              boxShadow: "transparent",
            }}
          >
            {/* Canvas de partículas */}
            <canvas
              ref={canvasRef}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: 0,
                borderRadius: "16px",
              }}
            />

            {/* Header */}
            <Box sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center", bgcolor: "#061224", zIndex: 1, position: "relative" }}>
              <Typography variant="subtitle1" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Sparkles size={20} color="#ffffffff"/>
                Chaska Agent <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1 }}>
                </motion.div>
              </Typography>
              <IconButton size="small" onClick={() => setOpen(false)} sx={{ color: "#fff" }}>
                <X size={16} />
              </IconButton>
            </Box>

            {/* Mensajes */}
            <Box sx={{ flex: 1, overflowY: "auto", p: 2, zIndex: 1, position: "relative" }}>
              <List>
                {messages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                  >
                    <ListItem sx={{ justifyContent: msg.sender === "user" ? "flex-end" : "flex-start", mb: 1 }}>
                      <Paper
                        sx={{
                          p: 1.5,
                          bgcolor: msg.sender === "user" ? "primary.main" : "#12213b",
                          color: msg.sender === "user" ? "#fff" : "#c0cfff",
                          borderRadius: 3,
                          maxWidth: "70%",
                          
                          boxShadow: msg.sender === "user"
                            ? "0 4px 15px rgba(6,182,212,0.4)"
                            : "0 2px 10px rgba(200,200,255,0.2)",
                        }}
                      >
                        <ListItemText primary={msg.text} />
                      </Paper>
                    </ListItem>
                  </motion.div>
                ))}
              </List>
            </Box>

            {/* Input */}
            <Box sx={{ p: 1.5, display: "flex", gap: 1, bgcolor: "#061224", zIndex: 1, position: "relative" }}>
              <TextField
                size="small"
                fullWidth
                placeholder="Escribe un mensaje..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => { if (e.key === "Enter") handleSend(); }}
                sx={{
                  input: { color: "#fff" },
                  bgcolor: "#0c1a33",
                  borderRadius: 2,
                  "& .MuiOutlinedInput-notchedOutline": { borderColor: "#22d3ee" },
                  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#06b6d4" },
                  "& .MuiOutlinedInput-input": { px: 1.5 },
                }}
              />
            <Button
            variant="contained"
            onClick={handleSend}
            sx={{
                bgcolor: "#06b6d4",
                "&:hover": { bgcolor: "#22d3ee", boxShadow: "0 0 12px #06b6d4" },
                minWidth: 0, // para que el botón no sea demasiado ancho
                p: 1.25, // padding
            }}
            >
            <Send size={20} color="#fff" />
            </Button>
            </Box>
          </Paper>
        )}

        {!open && (
          <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 1 }}>
            <IconButton
              size="large"
              onClick={() => setOpen(true)}
              sx={{
                bgcolor: "primary.main",
                color: "#fff",
                "&:hover": { bgcolor: "primary.dark", transform: "scale(1.1)" },
                boxShadow: "0 6px 18px rgba(6,182,212,0.5)",
                transition: "all 0.2s ease",
              }}
            >
              <Satellite size={28} />
            </IconButton>
          </motion.div>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default Chatbot;