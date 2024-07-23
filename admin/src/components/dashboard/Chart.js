import { useTheme } from "@mui/material/styles";
import { LineChart, axisClasses } from "@mui/x-charts";
import Title from "./Title";
import axios from "axios";
import { Alert } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { getAllAppointmentsWithInterval } from "../../state/appointmentSlice";
import { useDispatch, useSelector } from "react-redux";

// Generate Sales Data
function createData(time, amount) {
  return { time, amount: amount ?? null };
}

export default function Chart() {
  const theme = useTheme();

  const dispatch = useDispatch();
  const { isLoading, appointmentWithInterval, error } = useSelector((store) => store.appointment);

  useEffect(() => {
    dispatch(getAllAppointmentsWithInterval());
  }, []);

   // Transform the fetched data into the required format
   const transformedData = Object.entries(appointmentWithInterval).map(
    ([time, amount]) => createData(time, amount)
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div style={{ width: "100%", padding: 20 }}>
        <Alert severity="error">{error}</Alert>
      </div>
    );
  }

  return (
    <Fragment>
      <Title>Today</Title>
      <div style={{ width: "100%", flexGrow: 1, overflow: "hidden" }}>
        <LineChart
          dataset={transformedData}
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
              max: Math.max(...transformedData.map((data) => data.amount)) + 5,
              tickNumber: 6,
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
    </Fragment>
  );
}
