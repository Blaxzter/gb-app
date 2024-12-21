// features/playlists/playlistSlice.ts
import {createSlice, PayloadAction, createAction} from '@reduxjs/toolkit';
import {Gesangbuchlied} from '../../types/modeltypes.ts';

interface Playlist {
  id: string;
  name: string;
  songIds: string[]; // Changed from songs to songIds
}

// Define a type for the slice state
interface PlaylistsState {
  playlists: Playlist[];
}

// Define the initial state using the `PlaylistsState` type
const initialState: PlaylistsState = {
  playlists: [],
};

export const addSongsToPlaylists = createAction<{
  playlistIds: string[];
  songIds: string[];
}>('playlists/addSongsToPlaylists');

export const playlistSlice = createSlice({
  name: 'playlists',
  initialState,
  reducers: {
    // Add a new playlist
    addPlaylist: {
      reducer: (state, action: PayloadAction<Playlist>) => {
        state.playlists.push(action.payload);
      },
      prepare: (name: string) => ({
        payload: {
          id: Date.now().toString(), // Simple unique ID generation
          name,
          songIds: [], // Changed from songs to songIds
        },
      }),
    },
    // Add a new song to an existing playlist
    // Changed to handle songId instead of full song object
    addSongToPlaylist: (
      state,
      action: PayloadAction<{playlistId: string; songId: string}>,
    ) => {
      const {playlistId, songId} = action.payload;
      const playlist = state.playlists.find(p => p.id === playlistId);
      if (playlist && !playlist.songIds.includes(songId)) {
        playlist.songIds.push(songId);
      }
    },
    // Remove a playlist
    removePlaylist: (state, action: PayloadAction<string>) => {
      state.playlists = state.playlists.filter(
        playlist => playlist.id !== action.payload,
      );
    },
    // Remove songs from a playlist
    removeSongsFromPlaylist: (
      state,
      action: PayloadAction<{playlistId: string; songIds: string[]}>,
    ) => {
      const {playlistId, songIds} = action.payload;
      const playlist = state.playlists.find(p => p.id === playlistId);
      if (playlist) {
        playlist.songIds = playlist.songIds.filter(id => !songIds.includes(id));
      }
    },
    // Additional reducers for other actions can be added here
  },
  extraReducers: builder => {
    builder.addCase(addSongsToPlaylists, (state, action) => {
      const {playlistIds, songIds} = action.payload;
      playlistIds.forEach(playlistId => {
        const playlist = state.playlists.find(p => p.id === playlistId);
        if (playlist) {
          songIds.forEach(songId => {
            if (!playlist.songIds.includes(songId)) {
              playlist.songIds.push(songId);
            }
          });
        }
      });
    });
  },
});

// Export actions
export const {
  addPlaylist,
  addSongToPlaylist,
  removePlaylist,
  removeSongsFromPlaylist,
} = playlistSlice.actions;

// Export reducer
export default playlistSlice.reducer;
