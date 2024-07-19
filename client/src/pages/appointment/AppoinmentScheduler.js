import React, { useEffect, useState } from "react";
import dayjs from "dayjs"; // Import dayjs for date manipulation
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import { Alert } from "@mui/material";
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
        `${process.env.DOCSTREAM_API_URL}/unAvailableDates/getAll`
      );
      setUnavailableDates(response.data);
    } catch (error) {
      console.log(error.response ? error.response.data : "An error occurred");
    }
  };

  useEffect(() => {
    fetchUnavailableDates();
  }, []);

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
          minDate={dayjs()} // Disable dates before today
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      {selectedDate ? (
        <Alert severity="info" style={{ marginTop: 20 }}>
          Selected Date: {dayjs(selectedDate).format("dddd, MMMM D, YYYY")}
        </Alert>
      ) : (
        <Alert severity="info" style={{ marginTop: 20 }}>
          Please select from available dates
        </Alert>
      )}
    </div>
  );
};

export default AppointmentScheduler;
