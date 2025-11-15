// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#0d47a1" },      // Deep Navy
    secondary: { main: "#455a64" },    // Slate Gray
    background: { default: "#f8fafc", paper: "#ffffff" },
    success: { main: "#2e7d32" },
    info: { main: "#1565c0" },
    warning: { main: "#f9a825" },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h3: { fontWeight: 700 },
    h5: { fontWeight: 600 },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiCard: {
      styleOverrides: { root: { boxShadow: "0 4px 16px rgba(0,0,0,0.08)" } },
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>
);