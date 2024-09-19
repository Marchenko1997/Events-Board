import { createSelector } from "@reduxjs/toolkit";

const selectData = (state) => state.participants;

export const selectAllParticipants = createSelector(
  selectData,
  (participants) => participants.participants
);
