// components/CreatePlaylistDialog.js
import React, {useState} from 'react';
import {Dialog, Portal, Button, TextInput, FAB} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import {addPlaylist} from '../../store/features/playlistSlice.ts';
import {AppDispatch} from '../../store/store.ts';
import {useDispatch} from 'react-redux';

const CreatePlaylistComponent = () => {
  const dispatch: AppDispatch = useDispatch();
  const [playlistName, setPlaylistName] = useState('');

  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const handleCreateNewPlaylist = (playlistName: string) => {
    dispatch(addPlaylist(playlistName));
  };

  const handleSave = () => {
    handleCreateNewPlaylist(playlistName);
    setPlaylistName(''); // Reset after saving
    setIsDialogVisible(false); // Close dialog
  };

  return (
    <View>
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => setIsDialogVisible(true)}
      />

      <Portal>
        <Dialog
          visible={isDialogVisible}
          onDismiss={() => setIsDialogVisible(false)}>
          <Dialog.Title>Neue Playlist erstellen</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Playlist Name"
              value={playlistName}
              onChangeText={setPlaylistName}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setIsDialogVisible(false)}>Abbrechen</Button>
            <Button onPress={handleSave}>Speichern</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

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

export default CreatePlaylistComponent;
