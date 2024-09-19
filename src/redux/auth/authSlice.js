import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  fetchUser,
  fetchUserEventsByEmail,
  loginThunk,
  registerThunk,
} from "./operations";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      uid: "",
      name: "",
      email: "",
      birthDate: "",
      events: [],
    },
    token: "",
    isLoading: false,
    error: null,
  },
  reducers: {
    logOut(state) {
      state.user = {};
      state.token = "";
      state.isAuth = false;
    },
    updateUser(state, action) {
      state.user.birthDate = action.payload.birthDate;
      state.user.name = action.payload.name;
    },
    addToEvents(state, action) {
      state.user.events
        ? state.user.events.unshift(action.payload.events)
        : (state.user.events = [...action.payload.events]);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerThunk.fulfilled, (state, action) => {
        const { email, accessToken, uid } = action.payload;
        state.user = { email, uid };
        state.token = accessToken;
        state.isLoading = false;
        state.isAuth = true;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        const { email, accessToken, uid } = action.payload;
        state.user = { email, uid };
        state.token = accessToken;
        state.isLoading = false;
        state.isAuth = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = {
          ...state.user,
          birthDate: action.payload.birthDate,
          name: action.payload.name,
        };
        state.preOrders = action.payload.preOrders;
        state.isLoading = false;
        state.isAuth = true;
      })
      .addCase(fetchUserEventsByEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user.events = [...action.payload];
      })
      .addMatcher(
        isAnyOf(registerThunk.pending, loginThunk.pending, fetchUser.pending),
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          registerThunk.rejected,
          loginThunk.rejected,
          fetchUser.rejected
        ),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );
  },
});

export const authReducer = authSlice.reducer;
export const { logOut, updateUser, addToEvents } = authSlice.actions;
