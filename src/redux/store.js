import { configureStore } from "@reduxjs/toolkit";
import transactionReducer from "./transactionSlice";
import settingsReducer from "./settingsSlice";

export const store = configureStore({
  reducer: {
    transaction: transactionReducer,
    settings: settingsReducer,
  },
});
