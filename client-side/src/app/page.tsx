"use client";
import { Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import NaturalResourceButton from "@/components/NaturalResourceButton";

const resources: string[] = [
  "coffee",
  "wheat",
  "corn",
  "cotton",
  "sugar",
  "copper",
  "aluminium",
  "gas",
];

export default function Home() {
  return (
    <Stack direction="column" justifyContent="center" alignItems="center">
      <Typography variant="h2" align="center" m={10}>
        Natural Resources Trading
      </Typography>
      <Stack
        width={800}
        textAlign="center"
      >
        <Grid
          container
          spacing={0}
          rowGap={5}
        >
          {resources.map((resource) => (
            <NaturalResourceButton key={resource} resource={resource} />
          ))}
        </Grid>
      </Stack>
    </Stack>
  );
}
