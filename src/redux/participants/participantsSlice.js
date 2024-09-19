import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { addParticipant, fetchAllParticipantsByEventId } from "./operations";

const participantsSlice = createSlice({
  name: "participants",
  initialState: {
    participants: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addParticipant.fulfilled, (state, action) => {
        state.isLoading = false;
        state.participants
          ? state.participants.push(action.payload)
          : (state.participants = [...action.payload]);
      })
      .addCase(fetchAllParticipantsByEventId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.participants = [...action.payload];
      })
      .addMatcher(
        isAnyOf(addParticipant.pending, fetchAllParticipantsByEventId.pending),
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          addParticipant.rejected,
          fetchAllParticipantsByEventId.rejected
        ),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );
  },
});

export const participantsReducer = participantsSlice.reducer;
