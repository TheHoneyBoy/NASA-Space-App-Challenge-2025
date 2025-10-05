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
import { motion } from "framer-motion";
import { Upload, Sparkles, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LogoHawaHP from '../../assets/Logo-HawaHP.png';
import theme from '../../themeGUEST';

const COLORS = ["#ffffff", "#5a88d3ff", "#22d3ee", "#6b7280"];

const ModelTraining: React.FC = () => {
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

    // Simulación de entrenamiento
    setTimeout(() => {
      alert("Model trained successfully!");
      setLoading(false);
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
            Model Training Dashboard
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