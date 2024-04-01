import {SettingsState} from '../store/features/settingsSlice.ts';
import {createSelector} from 'reselect';

// Factory function to create a memoized selector for individual song settings
export const makeSelectIndividualSongSetting = () =>
  createSelector(
    [
      (state: SettingsState, _) => state.individualSongSettings,
      (state: SettingsState, _) => state.songViewSettings,
      (_, songId: string) => songId,
    ],
    (individualSongSettings, songViewSettings, songId) => {
      let individualSetting = individualSongSettings[songId] || null;
      if (!individualSetting) {
        return songViewSettings;
      }

      return {
        ...songViewSettings,
        ...individualSetting,
      };
    },
  );

// Selector for the songViewSettings
export const selectSongViewSettings = (state: SettingsState) =>
  state.sheetDisplaySettings;

export const selectAbcExample = (state: SettingsState) => state.abcExample;
