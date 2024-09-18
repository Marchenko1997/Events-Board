import { createSelector } from "@reduxjs/toolkit";

const selectData = (state) => state.data;

export const selectEvents = createSelector(selectData, (data) => data.events);
export const selectTotalEvents = createSelector(
  selectData,
  (data) => data.totalEvents
);

export const selectEventDetails = createSelector(
  selectData,
  (data) => data.eventDetails
);

export const selectEventTitle = createSelector(
  selectData,
  (data) => data.eventDetails.title
);

export const selectPage = createSelector(selectData, (data) => data.page);
