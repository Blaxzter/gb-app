import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Appbar, List, Text, Checkbox} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {useThemeSelection} from '../../hooks/useThemeSelection';

type Props = {
  onCancel: () => void;
  onConfirm: (selectedPlaylistIds: string[]) => void;
};

function SelectPlaylistComponent({onCancel, onConfirm}: Props) {
  const currentTheme = useThemeSelection();
  const playlists = useSelector(
    (state: RootState) => state.playlists.playlists,
  );
  const [selectedPlaylists, setSelectedPlaylists] = useState<Set<string>>(
    new Set(),
  );

  const togglePlaylistSelection = (playlistId: string) => {
    setSelectedPlaylists(prev => {
      const newSet = new Set(prev);
      if (newSet.has(playlistId)) {
        newSet.delete(playlistId);
      } else {
        newSet.add(playlistId);
      }
      return newSet;
    });
  };

  const handleConfirm = () => {
    onConfirm(Array.from(selectedPlaylists));
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>
        Du hast noch keine Playlists erstellt.
      </Text>
      <Text>Erstelle zuerst eine Playlist.</Text>
    </View>
  );

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: currentTheme.colors.background,
      }}>
      <Appbar.Header>
        <Appbar.Content title="Zu Playlist hinzufügen" />
        <Appbar.Action
          icon="check"
          disabled={selectedPlaylists.size === 0}
          onPress={handleConfirm}
        />
      </Appbar.Header>
      <ScrollView>
        {playlists.length === 0
          ? renderEmptyState()
          : playlists.map(playlist => (
              <List.Item
                key={playlist.id}
                title={playlist.name}
                description={`${playlist.songIds.length} Songs`}
                onPress={() => togglePlaylistSelection(playlist.id)}
                left={props => (
                  <View style={styles.checkboxContainer}>
                    <Checkbox
                      status={
                        selectedPlaylists.has(playlist.id)
                          ? 'checked'
                          : 'unchecked'
                      }
                    />
                  </View>
                )}
              />
            ))}
      </ScrollView>
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
  checkboxContainer: {
    justifyContent: 'center',
  },
});

export default SelectPlaylistComponent;
