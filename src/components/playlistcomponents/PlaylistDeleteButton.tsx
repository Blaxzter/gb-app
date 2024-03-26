import React, {useState} from 'react';
import {
  Modal,
  Button,
  Portal,
  Text,
  IconButton,
  Dialog,
  TextInput,
} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';

interface PlaylistDeleteButtonProps {
  handlePlaylistDelete: (playlistId: string) => void;
  playlistId: string;
  playlistName: string;
}

const PlaylistDeleteButton = ({
  handlePlaylistDelete,
  playlistId,
  playlistName,
}: PlaylistDeleteButtonProps) => {
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  const confirmDelete = () => {
    handlePlaylistDelete(playlistId);
    setIsDialogVisible(false);
  };

  return (
    <View>
      <IconButton icon="delete" onPress={() => setIsDialogVisible(true)} />

      <Portal>
        <Dialog
          visible={isDialogVisible}
          onDismiss={() => setIsDialogVisible(false)}>
          <Dialog.Title>Playlist Löschen</Dialog.Title>
          <Dialog.Content>
            <Text>
              <Text>Willst du die Playlist </Text>
              <Text style={styles.playlistName}>{playlistName} </Text>
              <Text>wirklich löschen?</Text>
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setIsDialogVisible(false)}>Abbrechen</Button>
            <Button onPress={confirmDelete}>Löschen</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  playlistName: {
    fontWeight: 'bold',
  },
});

export default PlaylistDeleteButton;
