// features/settings/settingsSlice.ts
import {createSlice} from '@reduxjs/toolkit';

// Define a type for the slice state
interface SettingsState {
  theme: 'light' | 'dark';
  // Other settings here
}

// Define the initial state using the `SettingsState` type
const initialState: SettingsState = {
  theme: 'light',
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    toggleTheme: state => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    // Additional reducers can be added here
  },
});

export const {toggleTheme} = settingsSlice.actions;

export default settingsSlice.reducer;
