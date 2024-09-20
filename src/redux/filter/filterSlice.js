import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "",
  eventDate: "",
  organizer: "",
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setTitleFilter: (state, action) => {
      state.title = action.payload;
    },
    setDateFilter: (state, action) => {
      state.eventDate = action.payload;
    },
    setOrganizerFilter: (state, action) => {
      state.organizer = action.payload;
    },
    clearFilters: (state) => {
      state.title = "";
      state.eventDate = "";
      state.organizer = "";
    },
  },
});

export const {
  setTitleFilter,
  setDateFilter,
  setOrganizerFilter,
  clearFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
