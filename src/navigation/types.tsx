import {Gesangbuchlied} from '../assets/scripts/modeltypes.tsx';

type RootStackParamList = {
  Home: undefined;
  SongListScreen: undefined;
  SongScreen: {lied: Gesangbuchlied};
};

export type {RootStackParamList};
