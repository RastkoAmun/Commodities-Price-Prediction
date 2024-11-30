import { Box, Button, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Image from "next/image";
import React from "react";

type NaturalResourceButtonTypes = {
  resource: string;
  width?: number;
  height?: number;
  topMargin?: number;
};

const NaturalResourceButton = ({
  resource,
  width,
  height,
}: NaturalResourceButtonTypes) => {
  return (
    <Grid size={3}>
      <Button
        sx={{
          backgroundColor: "darkgreen",
          height: 150,
          width: 150,
          cursor: "pointer",
          "&:hover": {
            background: "green",
          },
        }}
      >
        <Stack direction="column" justifyContent="space-between">
          <Box width={100} height={100}>
            <Image
              src={`/${resource}.png`}
              alt={`${resource}`}
              width={width ?? 90}
              height={height ?? 90}
            />
          </Box>
          <Typography color="black" textTransform="capitalize">
            {resource}
          </Typography>
        </Stack>
      </Button>
    </Grid>
  );
};

export default NaturalResourceButton;
