import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  appointments: [],
  userAppointments: [],
  error: null,
  isLoading: false,
};

export const getAllAppointments = createAsyncThunk(
  "appointment/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:4000/appointment/getAll"
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "An error occurred"
      );
    }
  }
);
export const getUserAppointments = createAsyncThunk(
  "appointment/getUsersAppointments",
  async (userEmail, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/appointment/getUsersAppointments",
        { userEmail }
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
      .addCase(getUserAppointments.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserAppointments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userAppointments = action.payload;
      })
      .addCase(getUserAppointments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { approve, cancel, contact } = appointmentSlice.actions;

export default appointmentSlice.reducer;
