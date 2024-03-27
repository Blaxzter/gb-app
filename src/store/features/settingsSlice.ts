// features/settings/settingsSlice.ts
import {createSelector, createSlice} from '@reduxjs/toolkit';

interface SongViewSettings {
  musicInstrumentName: string;
  musicInstrumentId: string;
}

// Define a type for the slice state
interface SettingsState {
  theme: 'light' | 'dark';
  songViewSettings: SongViewSettings;
  // type that every song can have individual settings
  individualSongSettings: {
    [songId: string]: SongViewSettings;
  };
}

// Define the initial state using the `SettingsState` type
const initialState: SettingsState = {
  theme: 'light',
  songViewSettings: {
    musicInstrumentName: 'Violin',
    musicInstrumentId: '40',
  },
  individualSongSettings: {},
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

export const selectIndividualSongSetting = createSelector(
  [
    (state: SettingsState, songId: string) => {
      let individualSetting = state.individualSongSettings[songId] || null;
      if (!individualSetting) {
        individualSetting = state.songViewSettings;
      } else {
        individualSetting = {
          ...individualSetting,
          ...state.songViewSettings,
        };
      }
      return individualSetting;
    },
  ],
  songSetting => songSetting,
);

export default settingsSlice.reducer;
