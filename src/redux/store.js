import { eventsReducer } from "./events/eventsSlice";

import { configureStore } from "@reduxjs/toolkit";


export const store = configureStore({
    reducer: {
        events: eventsReducer,
    },
});