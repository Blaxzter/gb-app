// features/settings/settingsSlice.ts
import {createSlice} from '@reduxjs/toolkit';
import {
  abcExample1,
  abcHappyBirthday,
  abcWithText,
  exportStandAllein,
} from '../../assets/scripts/constants.ts';

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
  abcExample:
    | 'orig'
    | 'abcExample1'
    | 'abcWithText'
    | 'abcHappyBirthday'
    | 'exportStandAllein';
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
  abcExample: 'orig',
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
    setSongViewSettings: (
      state,
      action: {
        payload: 'abcjs' | 'png' | 'transcribed' | 'localpng';
        type: string;
      },
    ) => {
      state.sheetDisplaySettings = action.payload;
    },
    setAbcExample: (
      state,
      action: {
        payload:
          | 'orig'
          | 'abcExample1'
          | 'abcWithText'
          | 'abcHappyBirthday'
          | 'exportStandAllein';
        type: string;
      },
    ) => {
      state.abcExample = action.payload;
    },
    // Additional reducers can be added here
  },
});

export const {
  toggleTheme,
  saveIndividualSongSetting,
  setSongViewSettings,
  setAbcExample,
} = settingsSlice.actions;

export default settingsSlice.reducer;
