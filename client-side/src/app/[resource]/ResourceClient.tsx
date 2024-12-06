"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Chart from "react-apexcharts";

type ByYearType = {
  year: string;
  value: number;
};

type YearlyDataType = {
  by_year: ByYearType[];
  best_year: ByYearType;
  worst_year: ByYearType;
  overall_average: number;
  ten_year_average: number;
};

const defaultYearlyData = {
  by_year: [],
  best_year: { year: "", value: 0 },
  worst_year: { year: "", value: 0 },
  overall_average: 0,
  ten_year_average: 0,
};

const defaultChartSeries = [
  {
    name: "",
    data: [] as number[],
  },
]

const ClientResource = ({ resource }: { resource: string }) => {
  const [yearlyData, setYearlyData] =
    useState<YearlyDataType>(defaultYearlyData);

  const [options, setOptions] = useState({});
  const [series, setSeries] = useState(defaultChartSeries);

  const [predictionOptions, setPredictionOptions] = useState({});
  const [predictionSeries, setPredictionSeries] = useState(defaultChartSeries);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/yearly", {
        params: {
          resource: resource,
        },
      })
      .then((res) => {
        console.log(res.data);
        const by_year: ByYearType[] = res.data.by_year;
        setYearlyData(res.data);

        setOptions({
          chart: {
            id: "basic-bar",
          },
          fill: {
            colors: ["#F44336", "#E91E63", "#9C27B0"],
          },
          xaxis: {
            categories: by_year
              .filter((data) => Number(data.year) > 1999)
              .map((data) => data.year),
          },
        });

        setSeries([
          {
            name: "value",
            data: by_year
              .filter((data) => Number(data.year) > 1999)
              .map((data) => Number(data.value.toFixed(2))),
          },
        ]);
      });
  }, [resource]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/prediction", {
        params: {
          resource: resource,
        },
      })
      .then((res) => {
        console.log(res.data)
        setPredictionOptions({
          chart: {
            id: "basic-bar",
          },
          fill: {
            colors: ["#F44336", "#E91E63", "#9C27B0"],
          },
          xaxis: {
            categories: res.data.years
          },
        });

        setPredictionSeries([
          {
            name: "value",
            data: res.data.values
          },
        ]);
      });
  }, [resource]);

  return (
    <Stack direction="row" bgcolor="green">
      <Stack
        direction="column"
        bgcolor="green"
        width="25%"
        height="100vh"
        alignItems="center"
      >
        <Box width={150} height={150} m={3}>
          <Image
            src={`/${resource}.png`}
            alt={`${resource}`}
            width={150}
            height={150}
            priority={true}
          />
        </Box>
        <Typography variant="h2" textAlign="center" textTransform="capitalize">
          {resource}
        </Typography>
        <Stack alignSelf="self-start" mt={2} ml={2}>
          <Typography>
            Best year: {yearlyData.best_year.year} (value:{" "}
            {yearlyData.best_year.value.toFixed(2)})
          </Typography>
          <Typography>
            Worst year: {yearlyData.worst_year.year} (value:{" "}
            {yearlyData.worst_year.value.toFixed(2)})
          </Typography>
          <Typography>
            Overall average: {yearlyData.overall_average}
          </Typography>
          <Typography>
            Last ten years average: {yearlyData.ten_year_average}
          </Typography>
        </Stack>
      </Stack>
      <Stack direction="column" bgcolor="gray" width="75%" height="100vh">
        <Box className="app" m={3}>
          <Box className="row">
            <Box className="mixed-chart" bgcolor="white">
              <Chart
                options={options}
                series={series}
                type="line"
                width="100%"
                height="300"
              />
            </Box>
          </Box>
        </Box>
        <Typography ml={3}>Prediction for the next 5 years: </Typography>
        <Box className="app" m={3} mt={0}>
          <Box className="row">
            <Box className="mixed-chart" bgcolor="white">
              <Chart
                options={predictionOptions}
                series={predictionSeries}
                type="line"
                width="100%"
                height="200"
              />
            </Box>
          </Box>
        </Box>
      </Stack>
    </Stack>
  );
};

export default ClientResource;
