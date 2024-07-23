import React, { useEffect, useState } from "react";
import dayjs from "dayjs"; // Import dayjs for date manipulation
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import { Alert } from "@mui/material";
import { getAllUnAvailableDates } from "../../state/unAvailableDatesSlice";
import { useDispatch, useSelector } from "react-redux";

const AppointmentScheduler = ({ selectedDate, setSelectedDate }) => {

  const dispatch = useDispatch();
  const { isLoading, unAvailableDates, error } = useSelector(
    (state) => state.unAvailableDates
  );

  useEffect(() => {
    dispatch(getAllUnAvailableDates());
  }, []);

  // Define available days for appointments (e.g., Monday to Friday)
  const isAvailableDay = (date) => {
    const dayOfWeek = dayjs(date).day(); // Get day of the week (0-6, where 0 is Sunday)
    return dayOfWeek >= 1; // Enable Monday to Saturday (days 1 to 6)
  };

  // Check if the date is an unavailable day
  const isUnavailableDay = (date) => {
    return unAvailableDates.some((data) =>
      dayjs(date).isSame(data.date, "date")
    );
  };

  // Combine available days, holidays, and other unavailable days
  const isDayDisabled = (date) => {
    return !isAvailableDay(date) || isUnavailableDay(date);
  };

  if(isLoading) return <div>Loading ...</div>
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
