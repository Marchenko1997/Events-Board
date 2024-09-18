import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { LIMIT_NUMBER } from "../../services/config";

export const fetchEvents = createAsyncThunk(
  "events/fetchEvents",
  async (page, thunkAPI) => {
    try {
      const response = await axios.get(
        `/events?page=${page}&limit=${LIMIT_NUMBER}`
      );
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const fetchEventById = createAsyncThunk(
  "event/fetchEventById",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`/events/${id}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
