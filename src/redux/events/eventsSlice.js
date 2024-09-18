import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { fetchEventById, fetchEvents } from "./operations";

const eventsSlice = createSlice({
  name: "events",
  initialState: {
    events: [],
    eventDetails: {},
    page: 1,
    totalEvents: 0,
    isLoading: false,
    error: null,
  },
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.events = [...action.payload.events];
        state.totalEvents = action.payload.totalRecords;
        state.eventDetails = {};
      })
      .addCase(fetchEventById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.eventDetails = action.payload;
      })
      .addMatcher(
        isAnyOf(fetchEvents.pending, fetchEventById.pending),
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(fetchEvents.rejected, fetchEventById.rejected),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );
  },
});

export const eventsReducer = eventsSlice.reducer;
export const { setPage } = eventsSlice.actions;
