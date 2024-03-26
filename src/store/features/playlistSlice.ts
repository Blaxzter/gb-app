// features/playlists/playlistSlice.ts
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Gesangbuchlied} from '../../types/modeltypes.ts';

interface Playlist {
  id: string;
  name: string;
  songs: Gesangbuchlied[];
}

// Define a type for the slice state
interface PlaylistsState {
  playlists: Playlist[];
}

// Define the initial state using the `PlaylistsState` type
const initialState: PlaylistsState = {
  playlists: [],
};

export const playlistSlice = createSlice({
  name: 'playlists',
  initialState,
  reducers: {
    // Add a new playlist
    addPlaylist: {
      reducer: (state, action: PayloadAction<Playlist>) => {
        state.playlists.push(action.payload);
      },
      prepare: (name: string, songs: Gesangbuchlied[] = []) => ({
        payload: {
          id: Date.now().toString(), // Simple unique ID generation
          name,
          songs,
        },
      }),
    },
    // Add a new song to an existing playlist
    addSongToPlaylist: (
      state,
      action: PayloadAction<{playlistId: string; song: Gesangbuchlied}>,
    ) => {
      const {playlistId, song} = action.payload;
      const playlist = state.playlists.find(p => p.id === playlistId);
      if (playlist) {
        playlist.songs.push(song);
      }
    },
    // Remove a playlist
    removePlaylist: (state, action: PayloadAction<string>) => {
      console.log('Filter Playlist');
      state.playlists = state.playlists.filter(
        playlist => playlist.id !== action.payload,
      );
    },
    // Additional reducers for other actions can be added here
  },
});

// Export actions
export const {addPlaylist, addSongToPlaylist, removePlaylist} =
  playlistSlice.actions;

// Export reducer
export default playlistSlice.reducer;
