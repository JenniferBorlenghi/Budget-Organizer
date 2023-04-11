import { createSlice } from "@reduxjs/toolkit";

export const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    settings: {
      Housing: 2200,
      Utilities: 200,
      Transportation: 300,
      Groceries: 500,
      Personal: 200,
      Clothing: 200,
      Health: 200,
      Leasing: 1800,
      Salary: 4000,
      ROI: 300,
    },
  },
  reducers: {
    updateSettings: (state, action) => {
      const newState = action.payload;
      for (const amount in newState) {
        newState[amount] = parseFloat(newState[amount]);
      }
      state.settings = newState;
    },
  },
});

export const { updateSettings } = settingsSlice.actions;

export default settingsSlice.reducer;
