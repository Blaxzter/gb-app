// features/settings/settingsSlice.ts
import {createSlice} from '@reduxjs/toolkit';

interface SongViewSettings {
  musicInstrumentName: string;
  musicInstrumentId: string;
}

// Define a type for the slice state
export interface SettingsState {
  theme: 'light' | 'dark';
  songViewSettings: SongViewSettings;
  // type that every song can have individual settings
  individualSongSettings: {
    [songId: string]: SongViewSettings;
  };
  // sheet display settings as string that has abcjs, png, transcribed
  sheetDisplaySettings: 'abcjs' | 'png' | 'transcribed' | 'localpng';
}

// Define the initial state using the `SettingsState` type
const initialState: SettingsState = {
  theme: 'light',
  songViewSettings: {
    musicInstrumentName: 'Violin',
    musicInstrumentId: '40',
  },
  individualSongSettings: {},
  sheetDisplaySettings: 'abcjs',
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    toggleTheme: state => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    saveIndividualSongSetting: (
      state,
      action: {payload: {songId: string; settings: any}; type: string},
    ) => {
      console.log('saveIndividualSongSetting', action.payload);
      // merge the new settings with the old settings
      state.individualSongSettings[action.payload.songId] = {
        ...state.individualSongSettings[action.payload.songId],
        ...action.payload.settings,
      };
    },
    // Additional reducers can be added here
  },
});

export const {toggleTheme, saveIndividualSongSetting} = settingsSlice.actions;

export default settingsSlice.reducer;
