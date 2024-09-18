import { createSelector } from "@reduxjs/toolkit";

const selectUserInfo = (state) => state.user;

export const selectIsAuth = createSelector(
  selectUserInfo,
  (user) => user.isAuth
);
