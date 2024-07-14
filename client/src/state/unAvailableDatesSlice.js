import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  unAvailableDates: [],
  error: null,
  isLoading: false,
};

export const getAllUnAvailableDates = createAsyncThunk(
  "unAvailableDates/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:4000/unAvailableDates/getAll");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "An error occurred"
      );
    }
  }
);
export const addUnAvailableDates = createAsyncThunk(
  "unAvailableDates/addNew",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:4000/unAvailableDates/addNew", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "An error occurred"
      );
    }
  }
);
export const updateUnAvailableDates = createAsyncThunk(
  "unAvailableDates/update",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:4000/unAvailableDates/update", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "An error occurred"
      );
    }
  }
);

export const deleteUnAvailableDates = createAsyncThunk(
  "unAvailableDates/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:4000/unAvailableDates/delete", { id });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "An error occurred"
      );
    }
  }
);

const unAvailableDates = createSlice({
  name: "unAvailableDates",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUnAvailableDates.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllUnAvailableDates.fulfilled, (state, action) => {
        state.isLoading = false;
        state.unAvailableDates = action.payload;
      })
      .addCase(getAllUnAvailableDates.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addUnAvailableDates.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addUnAvailableDates.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.unAvailableDates = action.payload;
      })
      .addCase(addUnAvailableDates.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteUnAvailableDates.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteUnAvailableDates.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.unAvailableDates = action.payload;
      })
      .addCase(deleteUnAvailableDates.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default unAvailableDates.reducer;
