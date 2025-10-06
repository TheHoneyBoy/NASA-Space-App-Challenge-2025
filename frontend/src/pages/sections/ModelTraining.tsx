import React, { useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Box,
  Card,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  ThemeProvider,
  createTheme
} from "@mui/material";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ReferenceLine } from "recharts";

import { motion } from "framer-motion";
import { Upload, Sparkles, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LogoHawaHP from '../../assets/Logo-HawaHP.png';
import theme from '../../themeGUEST';

const COLORS = ["#ffffff", "#5a88d3ff", "#22d3ee", "#6b7280"];

const ModelTraining: React.FC = () => {
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [hyperparameters, setHyperparameters] = useState({
    learningRate: 0.001,
    batchSize: 32,
    epochs: 10,
    validationSplit: 20,
  });

  const staticTrainingData = {
  epochs: Array.from({ length: hyperparameters.epochs }, (_, i) => i + 1),
  loss: [0.9, 0.75, 0.62, 0.55, 0.48, 0.42, 0.38, 0.35, 0.33, 0.3],
  val_loss: [0.95, 0.8, 0.7, 0.6, 0.55, 0.5, 0.45, 0.42, 0.4, 0.38],
  accuracy: [0.55, 0.65, 0.72, 0.78, 0.82, 0.86, 0.88, 0.91, 0.92, 0.94],
  val_accuracy: [0.5, 0.6, 0.68, 0.74, 0.79, 0.83, 0.86, 0.88, 0.9, 0.91],
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
    { fpr: 1.0, tpr: 1.0 },
  ],
  metrics: { accuracy: 0.92, precision: 0.88, recall: 0.91 },
};

const circleMetrics = ["accuracy", "precision", "recall"] as const;

  const secondaryTheme = createTheme({
      ...theme,
      palette: {
        ...theme.palette,
        primary: theme.palette.secondary,
      },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFile(file);
  };

  const handleHyperparameterChange = (field: string, value: number) => {
    setHyperparameters((prev) => ({ ...prev, [field]: value }));
  };

  const handleTrain = async () => {
    if (!selectedModel || !file) return;
    setLoading(true);
    setShowResults(false);

    setTimeout(() => {
      setLoading(false);
      setShowResults(true); // ✅ muestra las gráficas después de 3s
    }, 3000);
  };

  return (
    <ThemeProvider theme={secondaryTheme}>
      <Container maxWidth={false} sx={{ pb: 4 }}>
        {/* Logo */}
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

        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="overline"
            sx={{ color: "primary.main", fontWeight: 600, letterSpacing: 2 }}
          >
            AI EXOPLANET CLASSIFIER
          </Typography>
          <Typography variant="h3" sx={{ mt: 1, mb: 1 }}>
            Model Training
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "text.secondary", maxWidth: 700, mx: "auto" }}
          >
            Select a model, upload your dataset (.csv), configure hyperparameters, and start training.
          </Typography>
        </Box>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Grid container spacing={6} alignItems="flex-start">
            {/* LEFT PANEL: Form */}
            <Grid size={{ xs: 12, md: 5 }}>
              <Card sx={{ p: 4 }}>
                <Typography variant="h6" sx={{ mb: 3 }}>
                  Training Settings
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  {/* Select Model */}
                  <FormControl fullWidth>
                    <InputLabel>Select Model</InputLabel>
                    <Select
                      value={selectedModel}
                      onChange={(e) => setSelectedModel(e.target.value)}
                      label="Select Model"
                    >
                      <MenuItem value="kepler">Kepler</MenuItem>
                      <MenuItem value="tess">TESS</MenuItem>
                      <MenuItem value="k2">K2</MenuItem>
                    </Select>
                  </FormControl>

                  {/* Upload File */}
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<Upload />}
                  >
                    Upload CSV
                    <input type="file" accept=".csv" hidden onChange={handleFileChange} />
                  </Button>
                  {file && (
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      📂 {file.name}
                    </Typography>
                  )}

                  {/* Hyperparameters Section */}
                  <Card sx={{ p: 2, bgcolor: "rgba(255,255,255,0.05)" }}>
                    <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                      Hyperparameters
                    </Typography>

                    <TextField
                      label="Learning Rate (α)"
                      type="number"
                      value={hyperparameters.learningRate}
                      onChange={(e) =>
                        handleHyperparameterChange("learningRate", parseFloat(e.target.value))
                      }
                      fullWidth
                      sx={{ mb: 2 }}
                    />

                    <TextField
                      label="Batch Size"
                      type="number"
                      value={hyperparameters.batchSize}
                      onChange={(e) =>
                        handleHyperparameterChange("batchSize", parseInt(e.target.value))
                      }
                      fullWidth
                      sx={{ mb: 2 }}
                    />

                    <TextField
                      label="Number of Epochs"
                      type="number"
                      value={hyperparameters.epochs}
                      onChange={(e) =>
                        handleHyperparameterChange("epochs", parseInt(e.target.value))
                      }
                      fullWidth
                      sx={{ mb: 2 }}
                    />

                    <TextField
                      label="Validation Split (%)"
                      type="number"
                      value={hyperparameters.validationSplit}
                      onChange={(e) =>
                        handleHyperparameterChange("validationSplit", parseInt(e.target.value))
                      }
                      fullWidth
                    />
                  </Card>

                  {/* Train Button */}
                  <Button
                    variant="contained"
                    size="large"
                    disabled={!selectedModel || !file || loading}
                    startIcon={<Sparkles />}
                    onClick={handleTrain}
                    sx={{
                      background: "linear-gradient(135deg, #06b6d4 0%, #22d3ee 100%)",
                      py: 1.5,
                      boxShadow: "0 8px 32px rgba(6,182,212,0.4)",
                      "&:hover": {
                        boxShadow: "0 12px 48px rgba(6,182,212,0.6)",
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    Train Model
                  </Button>
                </Box>
              </Card>
            </Grid>

            {/* RIGHT PANEL: Placeholder o resultados de entrenamiento */}
<Grid size={{ xs: 12, md: 7 }}>
  <Card sx={{ p: 4 }}>
    {loading ? (
      <Box
        sx={{
          height: 300,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress size={80} color="primary" />
      </Box>
    ) : showResults ? (
      <>
        <Typography variant="h6" sx={{ mb: 2, color: "#22d3ee", textAlign: "center" }}>
          Training Results
        </Typography>

                {/* Circular metrics */}
        <Box sx={{ flexWrap: "wrap", display: "flex", justifyContent: "center", gap: 3, mb: 5 }}>
          {circleMetrics.map((metric) => (
            <Box key={metric} sx={{ position: "relative", width: 120, height: 120 }}>
              <CircularProgress
                variant="determinate"
                value={staticTrainingData.metrics[metric] * 100}
                size={120}
                thickness={8}
                sx={{ color: "#06b6d4", position: "absolute" }}
              />
              <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center" }}>
                <Typography sx={{ color: "#fff", fontWeight: 700 }}>
                  {(staticTrainingData.metrics[metric] * 100).toFixed(1)}%
                </Typography>
                <Typography sx={{ color: "#22d3ee", fontSize: 12 }}>{metric.toUpperCase()}</Typography>
              </Box>
            </Box>
          ))}
        </Box>

        {/* Loss / Accuracy Chart */}
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={staticTrainingData.epochs.map((e, i) => ({
            epoch: e,
            loss: staticTrainingData.loss[i],
            val_loss: staticTrainingData.val_loss[i],
            accuracy: staticTrainingData.accuracy[i],
            val_accuracy: staticTrainingData.val_accuracy[i],
          }))}>
            <CartesianGrid stroke="#333" strokeDasharray="3 3" />
            <XAxis dataKey="epoch" stroke="#22d3ee" label={{ value: 'Epoch', position: 'insideBottom', fill: '#22d3ee' }} />
            <YAxis stroke="#22d3ee" label={{ value: 'Value', angle: -90, position: 'insideLeft', fill: '#22d3ee' }} />
            <Tooltip />
            <Line type="monotone" dataKey="loss" stroke="#f87171" strokeWidth={2} dot />
            <Line type="monotone" dataKey="val_loss" stroke="#fb923c" strokeWidth={2} dot />
            <Line type="monotone" dataKey="accuracy" stroke="#22d3ee" strokeWidth={2} dot />
            <Line type="monotone" dataKey="val_accuracy" stroke="#06b6d4" strokeWidth={2} dot />
          </LineChart>
        </ResponsiveContainer>

        {/* ROC Curve */}
        <Typography variant="subtitle1" sx={{ mt: 3, mb: 1, color: "#22d3ee" }}>ROC Curve</Typography>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={staticTrainingData.roc_points}>
            <CartesianGrid stroke="#333" strokeDasharray="3 3" />
            <XAxis dataKey="fpr" stroke="#22d3ee" domain={[0,1]} />
            <YAxis dataKey="tpr" stroke="#22d3ee" domain={[0,1]} />
            <Line type="monotone" dataKey="tpr" stroke="#06b6d4" strokeWidth={3} dot />
            <ReferenceLine y={0} stroke="#666" strokeDasharray="5 5" />
          </LineChart>
        </ResponsiveContainer>
      </>
    ) : (
      <Typography
        variant="body1"
        sx={{ textAlign: "center", color: "text.secondary" }}
      >
        Upload your CSV, configure hyperparameters, and click “Train Model” to start.
      </Typography>
    )}
  </Card>
</Grid>
          </Grid>
        </motion.div>
      </Container>
    </ThemeProvider>
  );
};

export default ModelTraining;