import React, {useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/types';
import {Appbar, List, FAB, IconButton} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {RootState, AppDispatch} from '../store/store';
// Import the actions you need from the playlistSlice
import {addPlaylist, removePlaylist} from '../store/features/playlistSlice';
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
        {playlists.map((playlist, index) => (
          <List.Item
            key={index}
            title={playlist.name}
            description={`Anzahl der Songs: ${playlist.songs.length}`}
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
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default PlaylistScreen;
