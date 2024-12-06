"use client";
import { Box, Button, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import NaturalResourceButton from "@/components/NaturalResourceButton";
import { useRouter } from "next/navigation";

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
  const router = useRouter()

  const handleRedirect = () => {
    router.push("correlations")
  }

  return (
    <Stack direction="column" justifyContent="center" alignItems="center">
      <Typography variant="h2" align="center" m={10} mb={5}>
        Natural Resources Trading
      </Typography>
      <Stack width={800} textAlign="center">
        <Grid container spacing={0} rowGap={5}>
          {resources.map((resource) => (
            <NaturalResourceButton key={resource} resource={resource} />
          ))}
        </Grid>
      </Stack>
      <Box m={5}>
        <Button
          variant="contained"
          sx={{
            fontSize: 20,
            bgcolor: "darkgreen",
            cursor: "pointer",
            "&:hover": {
              background: "green",
            },
            textTransform: 'capitalize'
          }}
          onClick={handleRedirect}
        >
          See correlations!!!
        </Button>
      </Box>
    </Stack>
  );
}
