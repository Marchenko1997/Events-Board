import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addParticipant = createAsyncThunk(
  "participant/addParticipant",
  async ({ id, user }, thunkAPI) => {
    try {
      const response = await axios.post(
        `/events/${id}/register/participant`,
        user
      );
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const fetchAllParticipantsByEventId = createAsyncThunk(
  "participants/fetchAllParticipantsByEventId",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`/events/${id}/participants`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
