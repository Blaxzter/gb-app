import {Gesangbuchlied} from '../types/modeltypes.ts';

type RootStackParamList = {
  Home: undefined;
  SongListScreen: undefined;
  SongScreen: {lied: Gesangbuchlied};
  SettingsScreen: undefined;
  PlaylistScreen: undefined;
  PlaylistDetailScreen: {playlistId: string};
};

export type {RootStackParamList};
