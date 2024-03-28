import {SettingsState} from '../store/features/settingsSlice.ts';

// Selector for individual song settings
export const selectIndividualSongSetting = (
  state: SettingsState,
  songId: string,
) => {
  let individualSetting = state.individualSongSettings[songId] || null;
  if (!individualSetting) {
    return state.songViewSettings;
  }

  return {
    ...state.songViewSettings,
    ...individualSetting,
  };
};

// Selector for the songViewSettings
export const selectSongViewSettings = (state: SettingsState) =>
  state.sheetDisplaySettings;
