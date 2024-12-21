import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/types';
import {Appbar, List, Text} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {RootState, AppDispatch} from '../store/store';
// Import the actions you need from the playlistSlice
import {removePlaylist} from '../store/features/playlistSlice';
import CreatePlaylistComponent from '../components/playlistcomponents/CreatePlaylistComponent.tsx';
import {useThemeSelection} from '../hooks/useThemeSelection.ts';
import PlaylistDeleteButton from '../components/playlistcomponents/PlaylistDeleteButton.tsx';

type Props = NativeStackScreenProps<RootStackParamList, 'PlaylistScreen'>;

function PlaylistScreen({navigation}: Props) {
  const dispatch: AppDispatch = useDispatch();
  const currentTheme = useThemeSelection();

  // Assuming selectAllPlaylists is a selector you have defined to get all playlists from the state
  const playlists = useSelector(
    (state: RootState) => state.playlists.playlists,
  );

  const handlePlaylistDelete = (playlistId: string) => {
    dispatch(removePlaylist(playlistId));
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>
        Du hast noch keine Playlists erstellt.
      </Text>
      <Text>Erstelle eine neue Playlist mit dem + Button unten.</Text>
    </View>
  );

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: currentTheme.colors.background,
      }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Playlists" />
      </Appbar.Header>
      <ScrollView>
        {playlists.length === 0
          ? renderEmptyState()
          : playlists.map((playlist, index) => (
              <List.Item
                key={index}
                title={playlist.name}
                description={`Anzahl der Songs: ${playlist.songIds.length}`} // Changed from songs to songIds
                onPress={() =>
                  navigation.navigate('PlaylistDetailScreen', {
                    playlistId: playlist.id,
                  })
                }
                left={props => <List.Icon {...props} icon="playlist-music" />}
                right={() => (
                  <PlaylistDeleteButton
                    handlePlaylistDelete={handlePlaylistDelete}
                    playlistId={playlist.id}
                    playlistName={playlist.name}
                  />
                )}
              />
            ))}
      </ScrollView>
      <CreatePlaylistComponent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginTop: 40,
  },
  emptyText: {
    fontSize: 18,
    marginBottom: 10,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default PlaylistScreen;
