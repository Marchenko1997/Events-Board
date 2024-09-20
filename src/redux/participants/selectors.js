import { createSelector } from "@reduxjs/toolkit";

const selectData = (state) => state.participants;

export const selectAllParticipants = createSelector(
  selectData,
  (participants) => participants.participants
);

export const selectFilteredParticipants = createSelector(
  selectAllParticipants,
  (state) => state.filters, 
  (participants, filters) => {
    return participants.filter((participant) => {
      const nameMatch = participant.user.name
        .toLowerCase()
        .includes(filters.name.toLowerCase());
      const emailMatch = participant.user.email
        .toLowerCase()
        .includes(filters.email.toLowerCase());

      return nameMatch && emailMatch;
    });
  }
);