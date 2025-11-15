// src/components/Sidebar.jsx
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Collapse,
  Divider,
  Box,
} from "@mui/material";
import {
  Web,
  Memory,
  Security,
  Calculate,
  Build,
  Code,
  Storage,
  Javascript,
  Api,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import courseData from "../data/courseData";

const drawerWidth = 300;

const icons = {
  "Web Technologies": <Web />,
  "Operating Systems": <Memory />,
  Cybersecurity: <Security />,
  Aptitude: <Calculate />,
  "Desirable Skillset": <Build />,
};

const subIcons = {
  JavaScript: <Javascript />,
  "React.js": <Code />,
  "Node.js": <Api />,
  MongoDB: <Storage />,
};

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState({});

  const handleToggle = (section) => {
    setOpen((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleClick = (section, topic) => {
    const slug = `${section.toLowerCase().replace(/\s+/g, "-")}--${topic
      .toLowerCase()
      .replace(/\s+/g, "-")}`;
    navigate(`/${slug}`);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          bgcolor: "primary.main",
          color: "white",
        },
      }}
    >
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="h5" sx={{ fontWeight: 700, letterSpacing: 0.5 }}>
          Learning Portal
        </Typography>
        <Typography variant="caption" sx={{ opacity: 0.8 }}>
          Professional Study Hub
        </Typography>
      </Box>
      <Divider sx={{ bgcolor: "rgba(255,255,255,0.2)" }} />

      <List>
        {Object.keys(courseData).map((section) => {
          const isOpen = open[section];
          const topics = courseData[section];

          return (
            <div key={section}>
              <ListItemButton
                onClick={() => topics.length > 0 && handleToggle(section)}
                sx={{
                  mx: 1,
                  my: 0.5,
                  borderRadius: 2,
                  bgcolor: isOpen ? "rgba(255,255,255,0.15)" : "transparent",
                  "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
                }}
              >
                <ListItemIcon sx={{ color: "white" }}>
                  {icons[section]}
                </ListItemIcon>
                <ListItemText primary={section} />
                {topics.length > 0 &&
                  (isOpen ? <ExpandLess /> : <ExpandMore />)}
              </ListItemButton>

              <Collapse in={isOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {topics.map((t) => (
                    <ListItemButton
                      key={t.name}
                      sx={{ pl: 6, mx: 2, my: 0.5, borderRadius: 2 }}
                      onClick={() => handleClick(section, t.name)}
                    >
                      <ListItemIcon sx={{ color: "white", minWidth: 36 }}>
                        {subIcons[t.name] || <Code fontSize="small" />}
                      </ListItemIcon>
                      <ListItemText primary={t.name} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            </div>
          );
        })}
      </List>
    </Drawer>
  );
}
