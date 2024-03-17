import {Gesangbuchlied} from '../types/modeltypes.ts';

type RootStackParamList = {
  Home: undefined;
  SongListScreen: undefined;
  SongScreen: {lied: Gesangbuchlied};
  SettingsScreen: undefined;
};

export type {RootStackParamList};
