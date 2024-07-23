import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  appointments: [],
  appointmentWithInterval: [],
  error: null,
  isLoading: false,
};

export const getAllAppointments = createAsyncThunk(
  "appointment/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_DOCSTREAM_API_URL}/appointment/getAll`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "An error occurred"
      );
    }
  }
);
export const getAllAppointmentsWithInterval = createAsyncThunk(
  "appointment/getAllAppointmentsWithInterval",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_DOCSTREAM_API_URL}/appointment/getAllAppointmentsWithInterval`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "An error occurred"
      );
    }
  }
);

const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    approve: (state, action) => {
      // Logic to approve an appointment
    },
    cancel: (state, action) => {
      // Logic to cancel appointment
    },
    contact: (state, action) => {
      // Logic to contact appointments
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllAppointments.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllAppointments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.appointments = action.payload;
      })
      .addCase(getAllAppointments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getAllAppointmentsWithInterval.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllAppointmentsWithInterval.fulfilled, (state, action) => {
        state.isLoading = false;
        state.appointmentWithInterval = action.payload;
      })
      .addCase(getAllAppointmentsWithInterval.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { approve, cancel, contact } = appointmentSlice.actions;

export default appointmentSlice.reducer;
