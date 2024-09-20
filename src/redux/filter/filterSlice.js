import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "",
  eventDate: "",
  organizer: "",
  name: "", 
  email: "", 
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
    setNameFilter: (state, action) => {
      state.name = action.payload; 
    },
    setEmailFilter: (state, action) => {
      state.email = action.payload; 
    },
    clearFilters: (state) => {
      state.title = "";
      state.eventDate = "";
      state.organizer = "";
      state.name = ""; 
      state.email = ""; 
    },
  },
});

export const {
  setTitleFilter,
  setDateFilter,
  setOrganizerFilter,
  setNameFilter, 
  setEmailFilter, 
  clearFilters,
} = filterSlice.actions;

export default filterSlice.reducer;

export const selectFilters = (state) => state.filters;
