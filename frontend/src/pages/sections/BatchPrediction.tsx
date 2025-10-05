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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ThemeProvider,
  createTheme
} from "@mui/material";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Upload, Sparkles, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LogoHawaHP from '../../assets/Logo-HawaHP.png';
import theme from '../../themeGUEST';

const COLORS = ["#ffffff", "#5a88d3ff", "#22d3ee", "#6b7280"];

const BatchPrediccion: React.FC = () => {
  const navigate = useNavigate();
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [predictions, setPredictions] = useState<
    { koiName: string; prediction: string; probability: number }[]
  >([]);
  const [chartData, setChartData] = useState<
    { name: string; value: number }[]
  >([]);

  const secondaryTheme = createTheme({
      ...theme,
      palette: {
        ...theme.palette,
        primary: theme.palette.secondary,
      },
  });

  // Simula la llamada a la API
  const handlePredict = async () => {
    if (!selectedModel || !file) return;
    setLoading(true);

    // Simulación de tiempo de carga
    setTimeout(() => {
      const simulatedPreds = [
        { koiName: "Kepler-22b", prediction: "CONFIRMED", probability: 0.95 },
        { koiName: "Kepler-10c", prediction: "CANDIDATE", probability: 0.78 },
        { koiName: "Kepler-438b", prediction: "CONFIRMED", probability: 0.89 },
        { koiName: "Kepler-1658b", prediction: "FALSE POSITIVE", probability: 0.32 },
        { koiName: "Kepler-452b", prediction: "CANDIDATE", probability: 0.67 },
      ];

      const counts = simulatedPreds.reduce(
        (acc, p) => {
          acc[p.prediction] = (acc[p.prediction] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>
      );

      const chartFormatted = Object.entries(counts).map(([name, value]) => ({
        name,
        value,
      }));

      setPredictions(simulatedPreds);
      setChartData(chartFormatted);
      setLoading(false);
    }, 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFile(file);
  };

  const handleDownload = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["KOI Name,Prediction,Probability"]
        .concat(
          predictions.map(
            (p) => `${p.koiName},${p.prediction},${(p.probability * 100).toFixed(1)}%`
          )
        )
        .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "predictions.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <ThemeProvider theme={secondaryTheme}>
      <Container maxWidth={false} sx={{ pb: 4 }}>
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
          Batch Prediction Dashboard
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary", maxWidth: 700, mx: "auto" }}>
          Select a trained model, upload your exoplanet dataset (.csv) and visualize predictions instantly.
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
                Prediction Settings
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
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

                <Button
                  variant="contained"
                  size="large"
                  disabled={!selectedModel || !file || loading}
                  startIcon={<Sparkles />}
                  onClick={handlePredict}
                sx={{
                  background: "linear-gradient(135deg, #06b6d4 0%, #22d3ee 100%)", // De cyan a turquesa claro
                  py: 1.5,
                  boxShadow: "0 8px 32px rgba(6,182,212,0.4)", // Usa el main con opacidad
                  "&:hover": {
                    boxShadow: "0 12px 48px rgba(6,182,212,0.6)", // Hover más intenso
                    transform: "translateY(-2px)",
                  },
                }}
                >
                  Make Prediction
                </Button>
              </Box>
            </Card>
          </Grid>

        {/* RIGHT PANEL: Results */}
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
              ) : predictions.length > 0 ? (
                <>
                  {/* Pie Chart con leyenda personalizada */}
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Class Proportion
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
                    {/* Pie Chart */}
                    <Box sx={{ width: 600, height: 250 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={chartData}
                            dataKey="value"
                            nameKey="name"
                            outerRadius={90}
                            label={(entry) => `${entry.name}`} // Opcional: etiquetas dentro del pie
                          >
                            {chartData.map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                              />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value, name) => [`${value}`, `${name}`]} />
                        </PieChart>
                      </ResponsiveContainer>
                    </Box>

                    {/* Leyenda personalizada */}
                    <Box>
                      {chartData.map((entry, index) => {
                        const total = chartData.reduce((acc, item) => acc + item.value, 0);
                        const percentage = ((entry.value / total) * 100).toFixed(1);
                        return (
                          <Box key={index} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                            {/* Color */}
                            <Box
                              sx={{
                                width: 16,
                                height: 16,
                                bgcolor: COLORS[index % COLORS.length],
                                mr: 1,
                              }}
                            />
                            {/* Texto: nombre - nro - porcentaje */}
                            <Typography>
                              {entry.name}: {entry.value} ({percentage}%)
                            </Typography>
                          </Box>
                        );
                      })}
                    </Box>
                  </Box>


                  {/* Table */}
                  <Box sx={{ mt: 4 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                      <Typography variant="h6">Prediction Summary (Top 5)</Typography>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<Download />}
                        onClick={handleDownload}
                      >
                        Download Predictions
                      </Button>
                    </Box>

                    <TableContainer>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>KOI Name</TableCell>
                            <TableCell>Prediction</TableCell>
                            <TableCell>Probability</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {predictions.slice(0, 5).map((row, idx) => (
                            <TableRow key={idx}>
                              <TableCell>{row.koiName}</TableCell>
                              <TableCell>{row.prediction}</TableCell>
                              <TableCell>{(row.probability * 100).toFixed(1)}%</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                </>
              ) : (
                <Typography variant="body1" sx={{ textAlign: "center", color: "text.secondary" }}>
                  Upload your CSV and click “Make Prediction” to see results.
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

export default BatchPrediccion;
