import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Divider, List} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {Gesangbuchlied} from '../../types/modeltypes';
import {addSongsToPlaylists} from '../../store/features/playlistSlice';
import SelectPlaylistComponent from '../playlistcomponents/SelectPlaylistComponent';

type Props = {
  song: Gesangbuchlied;
  onClose: () => void;
  onNavigateToSong: () => void;
};

function SongMenuComponent({song, onClose, onNavigateToSong}: Props) {
  const [showPlaylistSelect, setShowPlaylistSelect] = useState(false);
  const dispatch = useDispatch();

  const handleAddToPlaylists = (selectedPlaylistIds: string[]) => {
    dispatch(
      addSongsToPlaylists({
        playlistIds: selectedPlaylistIds,
        songIds: [song.id.toString()],
      }),
    );
    setShowPlaylistSelect(false);
    onClose();
  };

  if (showPlaylistSelect) {
    return (
      <SelectPlaylistComponent
        onCancel={() => setShowPlaylistSelect(false)}
        onConfirm={handleAddToPlaylists}
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.songHeader}>
        <View style={styles.numberBox}>
          <Text style={styles.numberText}>{song.id}</Text>
        </View>
        <View style={styles.songInfo}>
          <Text style={styles.titleText}>{song.titel}</Text>
        </View>
      </View>
      <Divider horizontalInset />

      <View>
        <List.Item
          title="Lied anzeigen"
          left={props => <List.Icon {...props} icon="book-open-variant" />}
          onPress={onNavigateToSong}
        />
        <List.Item
          title="Zu Playlist hinzufügen"
          left={props => <List.Icon {...props} icon="playlist-plus" />}
          onPress={() => setShowPlaylistSelect(true)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 0,
  },
  songHeader: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'center',
  },
  numberBox: {
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    padding: 8,
    marginRight: 12,
    minWidth: 48,
    alignItems: 'center',
  },
  numberText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  songInfo: {
    flex: 1,
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SongMenuComponent;
