import { configureStore } from "@reduxjs/toolkit";
import { itemsReducer } from "./items.reducer";
import logger from "redux-logger";

export const store = configureStore({
  reducer: {
    items: itemsReducer,
  },
  middleware: (currentMiddleware) => currentMiddleware().concat([logger]),
  devTools: true,
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
