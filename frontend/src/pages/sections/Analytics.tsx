import React, { useState } from "react";
import { Box, Card, Typography, FormControl, InputLabel, Select, MenuItem, ThemeProvider, createTheme, CircularProgress } from "@mui/material";
import type { SelectChangeEvent} from "@mui/material";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { motion } from "framer-motion";
import theme from '../../themeGUEST';

const modelStats = {
  K2: { accuracy: 0.92, precision: 0.88, recall: 0.91, f1: 0.895, roc_auc: 0.93 },
  Kepler: { accuracy: 0.95, precision: 0.94, recall: 0.96, f1: 0.95, roc_auc: 0.97 },
  TESS: { accuracy: 0.89, precision: 0.85, recall: 0.88, f1: 0.865, roc_auc: 0.90 },
};

const generateROCData = (roc: number) => {
  const data = [];
  for (let i = 0; i <= 100; i += 5) {
    const x = i / 100;
    data.push({ fpr: x, tpr: Math.min(1, x * roc + (1 - roc) * (1 - x)) });
  }
  return data;
};

const secondaryTheme = createTheme({
  ...theme,
  palette: { ...theme.palette, primary: theme.palette.secondary },
});

const circleMetrics = ["accuracy", "precision", "recall"] as const;
const positions = [
  { top: 0, left: "50%", translateX: "-50%" }, // arriba
  { bottom: 0, left: "0%" },                   // abajo izquierda
  { bottom: 0, right: "0%" },                  // abajo derecha
];

const Analytics: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<keyof typeof modelStats>("K2");

  const handleChange = (e: SelectChangeEvent<string>) => {
    setSelectedModel(e.target.value as keyof typeof modelStats);
  };

  const rocData = generateROCData(modelStats[selectedModel].roc_auc);

  return (
    <ThemeProvider theme={secondaryTheme}>
      <Box sx={{ p: 4 }}>
        {/* Header con dropdown */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
          <Typography variant="h4" sx={{ color: "#22d3ee", fontWeight: 700 }}>
            Model Analytics
          </Typography>
          <FormControl sx={{ minWidth: 140 }}>
            <InputLabel sx={{ color: "#22d3ee" }}>Select Model</InputLabel>
            <Select
              value={selectedModel}
              onChange={handleChange}
              sx={{
                color: "#fff",
                "& .MuiOutlinedInput-notchedOutline": { borderColor: "#22d3ee" },
                "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#06b6d4" },
                "& .MuiSvgIcon-root": { color: "#22d3ee" },
              }}
            >
              {Object.keys(modelStats).map((model) => (
                <MenuItem key={model} value={model}>
                  {model}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Layout: ROC a la izquierda, métricas circulares en forma de triángulo */}
        <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {/* ROC Curve */}
          <Card sx={{ flex: 1, minWidth: 300, p: 3, bgcolor: "#0c1a33", borderRadius: 3, boxShadow: "0 8px 32px rgba(6,182,212,0.2)" }}>
            <Typography variant="h6" sx={{ color: "#22d3ee", mb: 2, textAlign: "center" }}>ROC Curve</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={rocData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="fpr" stroke="#22d3ee" label={{ value: 'FPR', position: 'insideBottom', fill: '#22d3ee' }} />
                <YAxis stroke="#22d3ee" label={{ value: 'TPR', angle: -90, position: 'insideLeft', fill: '#22d3ee' }} />
                <Tooltip formatter={(value: number) => value.toFixed(2)} />
                <Line type="monotone" dataKey="tpr" stroke="#06b6d4" strokeWidth={3} dot={{ r: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Métricas circulares */}
          {/* Métricas circulares */}
<Box sx={{ flex: 1, minWidth: 350, position: "relative", height: 400 }}>
  {circleMetrics.map((metric, index) => (
    <motion.div
      key={metric}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      style={{
        position: "absolute",
        ...positions[index],
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        sx={{
          width: 200,
          height: 200,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "#0c1a33",
          borderRadius: "50%",
          boxShadow: "0 8px 32px rgba(6,182,212,0.3)",
        }}
      >
        <CircularProgress
          variant="determinate"
          value={modelStats[selectedModel][metric] * 100}
          size={140}
          thickness={8}
          sx={{ color: "#06b6d4", position: "absolute" }}
        />
        <Box
          sx={{
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography sx={{ color: "#fff", fontWeight: 700, fontSize: "1.1rem" }}>
            {(modelStats[selectedModel][metric] * 100).toFixed(1)}%
          </Typography>
          <Typography sx={{ color: "#22d3ee", fontWeight: 500, mt: 0.5, fontSize: "0.9rem" }}>
            {metric.toUpperCase()}
          </Typography>
        </Box>
      </Card>
    </motion.div>
  ))}
</Box>

        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Analytics;