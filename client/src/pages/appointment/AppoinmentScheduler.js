import React, { useEffect, useState } from "react";
import dayjs from "dayjs"; // Import dayjs for date manipulation
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import { Container, Typography, Alert } from "@mui/material";
import axios from "axios";

const AppointmentScheduler = ({ selectedDate, setSelectedDate }) => {
  const [unavailableDates, setUnavailableDates] = useState([]);
  // Define available days for appointments (e.g., Monday to Friday)
  const isAvailableDay = (date) => {
    const dayOfWeek = dayjs(date).day(); // Get day of the week (0-6, where 0 is Sunday)
    return dayOfWeek >= 1 && dayOfWeek <= 5; // Enable Monday to Friday (days 1 to 5)
  };
  const fetchUnavailableDates = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/unAvailableDates/getAll"
      );
      setUnavailableDates(response.data);
    } catch (error) {
      console.log(error.response ? error.response.data : "An error occurred");
    }
  };
  useEffect(() => {
    fetchUnavailableDates();
  }, []);
  // Define holidays with their descriptions
  // const holidays = [
  //   { date: "2024-01-01", description: "New Year's Day" },
  //   { date: "2024-01-07", description: "Ethiopian Christmas" },
  //   { date: "2024-01-19", description: "Timkat" }, // Orthodox Epiphany
  //   { date: "2024-03-02", description: "Adwa Victory Day" },
  //   { date: "2024-04-10", description: "Eid al-Fitr" },
  //   { date: "2024-04-27", description: "Freedom Day" },
  //   { date: "2024-05-01", description: "International Workers' Day" },
  //   { date: "2024-07-23", description: "Eid al-Adha" },
  //   { date: "2024-09-11", description: "Ethiopian New Year" },
  //   { date: "2024-12-21", description: "December Solstice" },
  //   { date: "2024-12-25", description: "Christmas Day" },
  //   // Add more holidays here
  // ];

  // Check if the date is an unavailable day
  const isUnavailableDay = (date) => {
    return unavailableDates.some((data) =>
      dayjs(date).isSame(data.date, "date")
    );
  };

  // Combine available days, holidays, and other unavailable days
  const isDayDisabled = (date) => {
    return !isAvailableDay(date) || isUnavailableDay(date);
  };

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Select an available appointment date"
          value={selectedDate}
          onChange={(newValue) => setSelectedDate(newValue)}
          shouldDisableDate={isDayDisabled}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      {selectedDate ? (
        <Alert severity="info" style={{ marginTop: 20 }}>
          Selected Date: {dayjs(selectedDate).format("dddd, MMMM D, YYYY")}
        </Alert>
      ) : (
        <Alert severity="info" style={{ marginTop: 20 }}>
          Please select from Available dates
        </Alert>
      )}
    </div>
  );
};

export default AppointmentScheduler;
