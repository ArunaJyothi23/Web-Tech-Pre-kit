// src/App.js
import { BrowserRouter } from "react-router-dom";
import { Box } from "@mui/material";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";

export default function App() {
  return (
    <BrowserRouter>
      <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, md: 3 } }}>
          <MainContent />
        </Box>
      </Box>
    </BrowserRouter>
  );
}