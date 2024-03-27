import React, {useState} from 'react';
import Modal from 'react-native-modal';
import {FAB, Text, TextInput, Portal} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import {useThemeSelection} from '../../hooks/useThemeSelection.ts';
import BottomDrawer from '../playlistcomponents/BottomDrawer.tsx';
import {selectIndividualSongSetting} from '../../store/features/settingsSlice.ts';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store.ts';
import MidiInstrumentsList from './songsettingcomponents/MidiInstrumentsList.tsx';

type Props = {
  songId: string;
};

const SongScreenSettings = ({songId}: Props) => {
  const theme = useThemeSelection();
  const [visible, setModalVisibility] = useState<boolean>(false);
  const songSettings = useSelector((state: RootState) =>
    selectIndividualSongSetting(state.settings, songId),
  );

  console.log(songSettings);
  const [instrumentModalVisible, setInstrumentModalVisible] =
    React.useState(false);

  return (
    <View>
      <FAB
        style={styles.fab}
        icon="cog"
        onPress={() => setModalVisibility(true)}
        size={'small'}
      />
      <BottomDrawer
        visible={visible}
        hideModal={() => setModalVisibility(false)}
        theme={theme}>
        <View style={styles.container}>
          <TextInput
            label={'Instrument'}
            value={songSettings.musicInstrumentName}
            editable={false}
            mode={'outlined'}
            right={
              <TextInput.Icon
                icon="pencil"
                onPress={() => setInstrumentModalVisible(true)}
              />
            }
          />
          <Portal>
            <Modal
              isVisible={instrumentModalVisible}
              onDismiss={() => setInstrumentModalVisible(false)}
              style={{backgroundColor: theme.colors.surface}}>
              <MidiInstrumentsList />
            </Modal>
          </Portal>
          <Text>{JSON.stringify(songSettings)}</Text>
          {/*// select instrument*/}
        </View>
      </BottomDrawer>
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

export default SongScreenSettings;
