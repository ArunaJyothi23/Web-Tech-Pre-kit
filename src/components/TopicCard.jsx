import { Card, CardContent, Typography, Button, Stack } from "@mui/material";

export default function TopicCard({ topic }) {
  return (
    <Card sx={{ mb: 2, p: 1 }}>
      <CardContent>
        <Typography variant="h6">{topic.name}</Typography>

        <Stack direction="row" spacing={2} mt={2}>
          {topic.links.official && (
            <Button
              variant="contained"
              href={topic.links.official}
              target="_blank"
            >
              Official
            </Button>
          )}

          {topic.links.gfg && (
            <Button variant="outlined" href={topic.links.gfg} target="_blank">
              GFG
            </Button>
          )}

          {topic.links.mcqs && (
            <Button variant="outlined" href={topic.links.mcqs} target="_blank">
              MCQs
            </Button>
          )}

          {topic.links.tutorial && (
            <Button
              variant="outlined"
              href={topic.links.tutorial}
              target="_blank"
            >
              Tutorial
            </Button>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
