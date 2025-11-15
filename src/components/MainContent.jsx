// src/components/MainContent.jsx
import { useLocation } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import {
  OpenInNew,
  Article,
  School,
  Quiz,
  PlayArrow,
} from "@mui/icons-material";
import courseData from "../data/courseData";

const linkConfig = {
  official: {
    label: "Official Documentation",
    icon: <Article />,
    color: "success",
  },
  gfg: { label: "GeeksforGeeks", icon: <School />, color: "info" },
  mcqs: { label: "MCQ Practice", icon: <Quiz />, color: "warning" },
};

export default function MainContent() {
  const location = useLocation();
  const path = location.pathname.slice(1);

  if (!path) {
    return (
      <Container
        sx={{
          height: "90vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          background: "linear-gradient(135deg, #f5f7fa 0%, #e2e8f0 100%)",
          borderRadius: 3,
          boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
          p: 4,
        }}
      >
        <Typography
          variant="h3"
          fontWeight={700}
          color="primary"
          gutterBottom
          sx={{ letterSpacing: "1px" }}
        >
          Learning Portal
        </Typography>

        <Typography
          variant="h6"
          color="text.secondary"
          sx={{
            maxWidth: "480px",
            lineHeight: 1.6,
          }}
        >
          Select a topic from the sidebar to begin.
        </Typography>
      </Container>
    );
  }

  const [sectionSlug, topicSlug] = path.split("--");
  const sectionKey = Object.keys(courseData).find(
    (k) => k.toLowerCase().replace(/\s+/g, "-") === sectionSlug
  );

  if (!sectionKey) {
    return (
      <Typography color="error" sx={{ p: 3 }}>
        Section not found.
      </Typography>
    );
  }

  const topics = courseData[sectionKey];
  const topic = topics.find(
    (t) => t.name.toLowerCase().replace(/\s+/g, "-") === topicSlug
  );

  if (!topic) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" fontWeight={600} color="primary.main">
          {sectionKey}
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 1 }}>
          Click a sub-topic to view resources.
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 6, textAlign: { xs: "center", md: "left" } }}>
        <Typography
          variant="h3"
          fontWeight={700}
          sx={{
            background: "linear-gradient(90deg, #0d47a1, #00bcd4)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {topic.name}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
          Curated learning resources
        </Typography>
      </Box>

      {/* Resource Cards */}
      <Grid container spacing={4} sx={{ mb: 6 }}>
        {Object.entries(topic.links).map(([type, url]) => {
          if (type === "tutorial") return null;
          const { label, icon, color } = linkConfig[type];
          const hostname = new URL(url).hostname.replace(/^www\./, "");

          return (
            <Grid item xs={12} sm={6} md={4} key={type}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 3,
                  transition: "0.3s",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0 12px 24px rgba(0,0,0,0.12)",
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    {icon}
                    <Chip
                      label={label}
                      color={color}
                      size="small"
                      sx={{ ml: 1 }}
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {hostname}
                  </Typography>
                </CardContent>
                <Box sx={{ p: 2, pt: 0 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    color={color}
                    endIcon={<OpenInNew />}
                    href={url}
                    target="_blank"
                    rel="noopener"
                    sx={{ textTransform: "none", fontWeight: 600 }}
                  >
                    Open
                  </Button>
                </Box>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* YouTube MCQ Videos */}
      {topic.links.tutorial && (
        <>
          <Divider sx={{ my: 4 }} />
          <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>
            MCQ Practice Videos
          </Typography>
          <List>
            {topic.links.tutorial.map((video, i) => (
              <ListItem
                key={i}
                disablePadding
                sx={{
                  mb: 2,
                  borderRadius: 2,
                  bgcolor: "background.paper",
                  boxShadow: 1,
                  "&:hover": { boxShadow: 3 },
                }}
              >
                <ListItemText
                  primary={`Video ${i + 1}: MCQ Practice`}
                  secondary="Click to watch on YouTube"
                  primaryTypographyProps={{ fontWeight: 500 }}
                />
                <Button
                  variant="outlined"
                  startIcon={<PlayArrow />}
                  href={video}
                  target="_blank"
                  rel="noopener"
                  sx={{ borderRadius: 2, textTransform: "none" }}
                >
                  Watch
                </Button>
              </ListItem>
            ))}
          </List>
        </>
      )}
    </Container>
  );
}
