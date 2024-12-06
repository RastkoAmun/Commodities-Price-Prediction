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

type CorrelationsType = Record<string, number>;

const CorrelationPage = () => {
  const [options, setOptions] = useState({});
  // Dollar per Metric Ton
  const [seriesDPMT, setSeriesDPMT] = useState(defaultChartSeries);
  // Cents per Pound
  const [seriesCPP, setSeriesCPP] = useState(defaultChartSeries);

  const [correlations, setCorrelations] = useState<CorrelationsType>();

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

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/correlation-results").then((res) => {
      setCorrelations(res.data);
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
        {correlations ? (
          <Stack>
            <Typography textAlign="center">
              Coffee and Cotton are highly correlated, with a correlation
              coefficient of {correlations.coffee_cotton.toFixed(2)}
            </Typography>
            <Typography textAlign="center">
              Sugar and Coffee are highly correlated, with a correlation
              coefficient of {correlations.sugar_coffee.toFixed(2)}
            </Typography>
          </Stack>
        ) : (
          <></>
        )}
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
        {correlations ? (
          <Stack>
            <Typography textAlign="center">
              Aluminium and Copper have moderatly strong correlation, with a
              coefficient of {correlations.aluminium_copper.toFixed(2)}
            </Typography>
            <Typography textAlign="center">
              Wheat and Corn have highly strong correlation, with a coefficient
              of {correlations.wheat_corn.toFixed(2)}
            </Typography>
          </Stack>
        ) : (
          <></>
        )}
      </Stack>
    </Stack>
  );
};

export default CorrelationPage;
