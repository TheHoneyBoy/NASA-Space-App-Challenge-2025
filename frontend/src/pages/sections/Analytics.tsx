import React, { useState } from "react";
import { Box, Card, Typography, FormControl, InputLabel, Select, MenuItem, ThemeProvider, createTheme, CircularProgress } from "@mui/material";
import type { SelectChangeEvent} from "@mui/material";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ReferenceLine } from "recharts";
import { motion } from "framer-motion";
import theme from '../../themeGUEST';

const modelStats = {
  K2: { 
    accuracy: 0.92, 
    precision: 0.88, 
    recall: 0.91, 
    f1: 0.895, 
    roc_auc: 0.93,
    // More realistic ROC curve points for AUC 0.93
    roc_points: [
      { fpr: 0.0, tpr: 0.0 },
      { fpr: 0.1, tpr: 0.4 },
      { fpr: 0.2, tpr: 0.65 },
      { fpr: 0.3, tpr: 0.78 },
      { fpr: 0.4, tpr: 0.86 },
      { fpr: 0.5, tpr: 0.91 },
      { fpr: 0.6, tpr: 0.94 },
      { fpr: 0.7, tpr: 0.96 },
      { fpr: 0.8, tpr: 0.98 },
      { fpr: 0.9, tpr: 0.99 },
      { fpr: 1.0, tpr: 1.0 }
    ]
  },
  Kepler: { 
    accuracy: 0.95, 
    precision: 0.94, 
    recall: 0.96, 
    f1: 0.95, 
    roc_auc: 0.97,
    roc_points: [
      { fpr: 0.0, tpr: 0.0 },
      { fpr: 0.05, tpr: 0.3 },
      { fpr: 0.1, tpr: 0.6 },
      { fpr: 0.15, tpr: 0.78 },
      { fpr: 0.2, tpr: 0.85 },
      { fpr: 0.3, tpr: 0.92 },
      { fpr: 0.4, tpr: 0.95 },
      { fpr: 0.5, tpr: 0.97 },
      { fpr: 0.6, tpr: 0.98 },
      { fpr: 0.7, tpr: 0.99 },
      { fpr: 0.8, tpr: 0.995 },
      { fpr: 0.9, tpr: 0.998 },
      { fpr: 1.0, tpr: 1.0 }
    ]
  },
  TESS: { 
    accuracy: 0.89, 
    precision: 0.85, 
    recall: 0.88, 
    f1: 0.865, 
    roc_auc: 0.90,
    roc_points: [
      { fpr: 0.0, tpr: 0.0 },
      { fpr: 0.2, tpr: 0.45 },
      { fpr: 0.3, tpr: 0.62 },
      { fpr: 0.4, tpr: 0.73 },
      { fpr: 0.5, tpr: 0.81 },
      { fpr: 0.6, tpr: 0.87 },
      { fpr: 0.7, tpr: 0.91 },
      { fpr: 0.8, tpr: 0.94 },
      { fpr: 0.9, tpr: 0.97 },
      { fpr: 1.0, tpr: 1.0 }
    ]
  },
};

const secondaryTheme = createTheme({
  ...theme,
  palette: { ...theme.palette, primary: theme.palette.secondary },
});

const circleMetrics = ["accuracy", "precision", "recall"] as const;
const positions = [
  { top: 0, left: "50%", translateX: "-50%" },
  { bottom: 0, left: "0%" },
  { bottom: 0, right: "0%" },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <Box sx={{ bgcolor: '#0c1a33', p: 2, border: '1px solid #22d3ee', borderRadius: 1 }}>
        <Typography sx={{ color: '#fff' }}>{`FPR: ${label.toFixed(2)}`}</Typography>
        <Typography sx={{ color: '#06b6d4' }}>{`TPR: ${payload[0].value.toFixed(2)}`}</Typography>
      </Box>
    );
  }
  return null;
};

const Analytics: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<keyof typeof modelStats>("K2");

  const handleChange = (e: SelectChangeEvent<string>) => {
    setSelectedModel(e.target.value as keyof typeof modelStats);
  };

  const currentModel = modelStats[selectedModel];

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
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" sx={{ color: "#22d3ee" }}>
                ROC Curve
              </Typography>
              <Typography variant="body2" sx={{ color: "#06b6d4", bgcolor: 'rgba(6,182,212,0.1)', px: 2, py: 0.5, borderRadius: 2 }}>
                AUC: {currentModel.roc_auc.toFixed(3)}
              </Typography>
            </Box>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={currentModel.roc_points}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis 
                  dataKey="fpr" 
                  stroke="#22d3ee" 
                  label={{ value: 'False Positive Rate', position: 'insideBottom', offset: -5, fill: '#22d3ee' }} 
                  domain={[0, 1]}
                  ticks={[0, 0.2, 0.4, 0.6, 0.8, 1.0]}
                />
                <YAxis 
                  stroke="#22d3ee" 
                  label={{ value: 'True Positive Rate', angle: -90, position: 'insideLeft', offset: 10, fill: '#22d3ee' }} 
                  domain={[0, 1]}
                  ticks={[0, 0.2, 0.4, 0.6, 0.8, 1.0]}
                />
                <Tooltip content={<CustomTooltip />} />
                {/* Diagonal reference line for random classifier */}
                <ReferenceLine 
                  y={0} 
                  stroke="#666" 
                  strokeDasharray="5 5" 
                  label={{ value: 'Random Classifier', position: 'insideTopRight', fill: '#666' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="tpr" 
                  stroke="#06b6d4" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: "#06b6d4", strokeWidth: 2 }} 
                  activeDot={{ r: 6, fill: "#22d3ee" }}
                />
                {/* Area under curve - subtle fill */}
                <Line 
                  type="monotone" 
                  dataKey="tpr" 
                  stroke="none" 
                  dot={false}
                  fill="url(#colorGradient)"
                  fillOpacity={0.1}
                />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.3}/>
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
              </LineChart>
            </ResponsiveContainer>
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', gap: 3 }}>
              <Typography variant="body2" sx={{ color: '#22d3ee', display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: 12, height: 12, bgcolor: '#06b6d4', mr: 1, borderRadius: 1 }} />
                Model Performance
              </Typography>
              <Typography variant="body2" sx={{ color: '#666', display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: 12, height: 2, bgcolor: '#666', mr: 1 }} />
                Random Classifier
              </Typography>
            </Box>
          </Card>

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
                    value={currentModel[metric] * 100}
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
                      {(currentModel[metric] * 100).toFixed(1)}%
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