import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { eventsReducer } from "./events/eventsSlice";
import { authReducer } from "./auth/authSlice";
import { participantsReducer } from "./participants/participantsSlice";

const eventsPersistConfig = {
  key: "data",
  storage,
  whitelist: ["events", "eventDetails"],
};

const userPersistConfig = {
  key: "user",
  storage,
  whitelist: ["user", "token", "isAuth"],
};

const participantsPersistConfig = {
  key: "participants",
  storage,
  whitelist: ["participants"],
};

const rootReducer = combineReducers({
  data: persistReducer(eventsPersistConfig, eventsReducer),
  user: persistReducer(userPersistConfig, authReducer),
  participants: persistReducer(participantsPersistConfig, participantsReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
