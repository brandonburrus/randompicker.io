import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { itemsReducer } from "./items.reducer";
import { persistReducer, persistStore } from "redux-persist";
import createCompressor from "redux-persist-transform-compress";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";

const rootReducer = combineReducers({
  items: itemsReducer,
});

const middleware = [logger];

const persistenceCompressor = createCompressor();

const persistConfig = {
  key: "RANDOM_PICKER",
  version: 1,
  timeout: 4_000,
  storage,
  transforms: [persistenceCompressor],
};

export const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  middleware: (currentMiddleware) => currentMiddleware().concat(middleware),
  devTools: true,
});

export const storePersistor = persistStore(store);

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
