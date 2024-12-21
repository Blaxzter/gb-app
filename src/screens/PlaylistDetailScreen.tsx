import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Appbar, TouchableRipple, Text} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../store/store';
import LiedListEntry from '../components/songlistcomponents/LiedListEntry.tsx';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/types.ts';
import {useThemeSelection} from '../hooks/useThemeSelection.ts';
import {removeSongsFromPlaylist} from '../store/features/playlistSlice';

type Props = NativeStackScreenProps<RootStackParamList, 'PlaylistDetailScreen'>;

// Assuming you're passing the playlistId as a route parameter
function PlaylistDetailScreen({route, navigation}: Props) {
  const dispatch = useDispatch();
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedSongs, setSelectedSongs] = useState<Set<string>>(new Set());
  const currentTheme = useThemeSelection();
  const {playlistId} = route.params;

  const playlist = useSelector((state: RootState) =>
    state.playlists.playlists.find(p => p.id === playlistId),
  );

  // Get all songs from gbData
  const allSongs = useSelector((state: RootState) => state.gbData.data);

  // Map songIds to actual song objects
  const playlistSongs = playlist?.songIds
    .map(songId => allSongs.find(song => song.id.toString() === songId))
    .filter(song => song !== undefined);

  const toggleSelectMode = () => {
    setIsSelectMode(!isSelectMode);
    setSelectedSongs(new Set());
  };

  const toggleSongSelection = (songId: string) => {
    setSelectedSongs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(songId)) {
        newSet.delete(songId);
      } else {
        newSet.add(songId);
      }
      if (newSet.size === 0) {
        setIsSelectMode(false);
      }
      return newSet;
    });
  };

  const handleDeleteSelected = () => {
    if (playlist && selectedSongs.size > 0) {
      dispatch(
        removeSongsFromPlaylist({
          playlistId: playlist.id,
          songIds: Array.from(selectedSongs),
        }),
      );
      setIsSelectMode(false);
    }
  };

  const renderSelectionHeader = () => (
    <Appbar.Header>
      <Appbar.Action icon="close" onPress={toggleSelectMode} />
      <Appbar.Content title={`${selectedSongs.size} ausgewählt`} />
      {selectedSongs.size > 0 && (
        <Appbar.Action icon="delete" onPress={handleDeleteSelected} />
      )}
    </Appbar.Header>
  );

  if (!playlist) {
    return (
      <View style={styles.container}>
        <Text>Playlist not found.</Text>
      </View>
    );
  }

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: currentTheme.colors.background,
      }}>
      {isSelectMode ? (
        renderSelectionHeader()
      ) : (
        <Appbar.Header>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title={playlist?.name} />
          {playlistSongs?.length && playlistSongs?.length > 0 && (
            <Appbar.Action icon="pencil" onPress={toggleSelectMode} />
          )}
        </Appbar.Header>
      )}
      {playlist.songIds.length === 0 && (
        <View style={styles.noSongsText}>
          <Text variant={'bodyLarge'}>
            Du hast noch keine Lieder zu dieser Playlist hinzugefügt.
          </Text>
        </View>
      )}
      <ScrollView>
        {playlistSongs?.map((song, index) => (
          <TouchableRipple
            key={song.id}
            style={styles.songListEntry}
            onPress={() => {
              if (isSelectMode) {
                toggleSongSelection(song.id.toString());
              } else {
                navigation.navigate('SongScreen', {lied: song});
              }
            }}
            onLongPress={() => {
              if (!isSelectMode) {
                setIsSelectMode(true);
                toggleSongSelection(song.id.toString());
              }
            }}>
            <LiedListEntry
              lied={song}
              index={index}
              isSelectMode={isSelectMode}
              isSelected={selectedSongs.has(song.id.toString())}
            />
          </TouchableRipple>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  noSongsText: {
    padding: 10,
    alignItems: 'center',
  },
  songListEntry: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    overflow: 'hidden',
  },
});

export default PlaylistDetailScreen;
