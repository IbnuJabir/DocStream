import { useTheme } from "@mui/material/styles";
import { LineChart, axisClasses } from "@mui/x-charts";
import Title from "./Title";
import axios from "axios";
import { Alert } from "@mui/material";
import { Fragment, useEffect, useState } from "react";

// Generate Sales Data
function createData(time, amount) {
  return { time, amount: amount ?? null };
}

export default function Chart() {
  const [appointmentData, setAppointmentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    const fetchAppointmentData = async () => {
      try {
        const response = await axios.get(
          "/appointment/getAllAppointmentsWithInterval" // Adjust the URL to your actual endpoint
        );
        const fetchedData = response.data;

        // Transform the fetched data into the required format
        const transformedData = Object.entries(fetchedData).map(
          ([time, amount]) => createData(time, amount)
        );

        setAppointmentData(transformedData);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointmentData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div style={{ width: "100%", padding: 20}}>
        <Alert severity="error">{error}</Alert>
      </div>
    );
  }

  return (
    <Fragment>
      <Title>Today</Title>
      <div style={{ width: "100%", flexGrow: 1, overflow: "hidden" }}>
        <LineChart
          dataset={appointmentData}
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
              max: Math.max(...appointmentData.map((data) => data.amount)) + 5,
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
