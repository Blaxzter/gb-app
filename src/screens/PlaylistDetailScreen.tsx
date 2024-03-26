import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Appbar, TouchableRipple, Text} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {RootState} from '../store/store';
import LiedListEntry from '../components/songlistcomponents/LiedListEntry.tsx';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/types.ts';
import {useThemeSelection} from '../hooks/useThemeSelection.ts';

type Props = NativeStackScreenProps<RootStackParamList, 'PlaylistDetailScreen'>;

// Assuming you're passing the playlistId as a route parameter
function PlaylistDetailScreen({route, navigation}: Props) {
  const currentTheme = useThemeSelection();
  const {playlistId} = route.params;

  // Selector to find the playlist by ID from the Redux store
  const playlist = useSelector((state: RootState) =>
    state.playlists.playlists.find(p => p.id === playlistId),
  );

  if (!playlist) {
    // Playlist not found
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
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={playlist.name} />
      </Appbar.Header>
      {playlist.songs.length === 0 && (
        <View style={styles.noSongsText}>
          <Text variant={'bodyLarge'}>
            Du hast noch keine Lieder zu dieser Playlist hinzugefügt.
          </Text>
        </View>
      )}
      <ScrollView>
        {playlist.songs.map((song, index) => (
          <TouchableRipple
            style={styles.songListEntry}
            onPress={() => {
              navigation.navigate('SongScreen', {lied: song});
            }}>
            <LiedListEntry lied={song} index={index} />
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
