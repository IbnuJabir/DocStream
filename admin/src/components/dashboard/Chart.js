import * as React from "react";
import { useTheme } from "@mui/material/styles";
import { LineChart, axisClasses } from "@mui/x-charts";

import Title from "./Title";
import axios from "axios";

// Generate Sales Data
function createData(time, amount) {
  return { time, amount: amount ?? null };
}

const data = [
  createData("0", 0),
  createData("01-05", 300),
  createData("06-10", 600),
  createData("11-15", 800),
  createData("16-20", 1500),
  createData("21-25", 2000),
  createData("26-30", 2400),
  // createData("31-35", 2400),
  // createData("36-40", 2500),
  // createData("41-45", 2400),
  // createData("46-50", 2500),
];

export default function Chart() {
  const theme = useTheme();
  const fetchApp = async () => {
    try {
      const result = await axios.get(
        "/appointment/getAllAppointmentsWithInterval"
      );
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    fetchApp();
  }, []);
  return (
    <React.Fragment>
      <Title>Today</Title>
      <div style={{ width: "100%", flexGrow: 1, overflow: "hidden" }}>
        <LineChart
          dataset={data}
          margin={{
            top: 16,
            right: 20,
            left: 70,
            bottom: 30,
          }}
          xAxis={[
            {
              scaleType: "point",
              dataKey: "time",
              tickNumber: 2,
              tickLabelStyle: theme.typography.body2,
            },
          ]}
          yAxis={[
            {
              label: "Appointments",
              labelStyle: {
                ...theme.typography.body1,
                fill: theme.palette.text.primary,
              },
              tickLabelStyle: theme.typography.body2,
              max: 2500,
              tickNumber: 3,
            },
          ]}
          series={[
            {
              dataKey: "amount",
              showMark: false,
              color: theme.palette.primary.light,
            },
          ]}
          sx={{
            [`.${axisClasses.root} line`]: {
              stroke: theme.palette.text.secondary,
            },
            [`.${axisClasses.root} text`]: {
              fill: theme.palette.text.secondary,
            },
            [`& .${axisClasses.left} .${axisClasses.label}`]: {
              transform: "translateX(-25px)",
            },
          }}
        />
      </div>
    </React.Fragment>
  );
}
