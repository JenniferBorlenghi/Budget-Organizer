import { createSlice } from "@reduxjs/toolkit";

export const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    settings: {},
  },
  reducers: {
    updateSettings: (state, action) => {
      const newState = action.payload;
      const id = action.payload.id;
      for (const amount in newState) {
        if (parseFloat(newState[amount]) !== isNaN) {
          newState[amount] = parseFloat(newState[amount]);
        }
      }
      state.settings = newState;
      state.settings.id = id;
    },

    setSettings: (state, action) => {
      state.settings = action.payload;
    },
  },
});

export const { updateSettings, setSettings } = settingsSlice.actions;

export default settingsSlice.reducer;
