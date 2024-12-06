"use client";
import { Box, Stack, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

const defaultChartSeries = [
  {
    name: "",
    data: [] as number[],
  },
];

const CorrelationPage = () => {
  const [options, setOptions] = useState({});
  // Dollar per Metric Ton
  const [seriesDPMT, setSeriesDPMT] = useState(defaultChartSeries);
  // Cents per Pound
  const [seriesCPP, setSeriesCPP] = useState(defaultChartSeries);

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/recent").then((res) => {
      setOptions({
        chart: {
          id: "basic-bar",
          toolbar: {
            show: false,
          },
        },
        fill: {
          colors: ["#10d35a", "#08b3c1", "#1071d3", "#6010d3"],
        },
        xaxis: {
          categories: res.data.years,
          labels: {
            rotate: -45,
            rotateAlways: true,
          },
        },
      });

      setSeriesCPP([
        {
          name: "sugar",
          data: res.data.resources.sugar,
        },
        {
          name: "coffee",
          data: res.data.resources.coffee,
        },
        {
          name: "cotton",
          data: res.data.resources.cotton,
        },
      ]);

      setSeriesDPMT([
        {
          name: "aluminium",
          data: res.data.resources.aluminium,
        },
        {
          name: "copper",
          data: res.data.resources.copper,
        },
        {
          name: "wheat",
          data: res.data.resources.wheat,
        },
        {
          name: "corn",
          data: res.data.resources.corn,
        },
      ]);
      console.log(res.data);
    });
  }, []);

  return (
    <Stack direction="row" height="100vh">
      <Stack width="50%">
        <Typography textAlign="center" mt={3} fontSize={20}>
          Cent per Pound
        </Typography>
        <Box className="app" m={3}>
          <Box className="row">
            <Box className="mixed-chart" bgcolor="white">
              <Chart
                options={options}
                series={seriesCPP}
                type="line"
                width="100%"
                height="400"
              />
            </Box>
          </Box>
        </Box>
      </Stack>
      <Stack width="50%" borderLeft={2} borderColor="black">
        <Typography textAlign="center" mt={3} fontSize={20}>
          Dollars per Metric Ton
        </Typography>
        <Box className="app" m={3}>
          <Box className="row">
            <Box className="mixed-chart" bgcolor="white">
              <Chart
                options={options}
                series={seriesDPMT}
                type="line"
                width="100%"
                height="400"
              />
            </Box>
          </Box>
        </Box>
      </Stack>
    </Stack>
  );
};

export default CorrelationPage;
