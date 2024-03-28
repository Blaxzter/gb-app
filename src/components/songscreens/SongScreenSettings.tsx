import React, {useState} from 'react';
import Modal from 'react-native-modal';
import {FAB, Text, TextInput, Portal} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import {useThemeSelection} from '../../hooks/useThemeSelection.ts';
import BottomDrawer from '../bits/BottomDrawer.tsx';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store.ts';
import MidiInstrumentsList from './songsettingcomponents/MidiInstrumentsList.tsx';
import {selectIndividualSongSetting} from '../../hooks/useSettings.ts';
import {useAppDispatch} from '../../store/hooks.ts';
import {saveIndividualSongSetting} from '../../store/features/settingsSlice.ts';

type Props = {
  songId: string;
  reRender: () => void;
};

interface Setting {
  property: string;
  value: any;
}

const SongScreenSettings = ({songId, reRender}: Props) => {
  const dispatch = useAppDispatch();
  const theme = useThemeSelection();
  const [visible, setModalVisibility] = useState<boolean>(false);
  let songSettings = useSelector((state: RootState) =>
    selectIndividualSongSetting(state.settings, songId),
  );
  const handleSave = (settings: Setting[]) => {
    const songSettings = settings.reduce<Record<string, any>>(
      (acc, {property, value}) => {
        acc[property] = value;
        return acc;
      },
      {},
    );
    reRender();
    dispatch(
      saveIndividualSongSetting({
        songId: songId,
        settings: songSettings,
      }),
    );
  };

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
              animationIn="slideInRight"
              animationOut="slideOutRight"
              onBackdropPress={() => setInstrumentModalVisible(false)}
              swipeDirection={['right']}
              // propagateSwipe={true}
              isVisible={instrumentModalVisible}
              useNativeDriverForBackdrop
              onDismiss={() => setInstrumentModalVisible(false)}
              onBackButtonPress={() => setInstrumentModalVisible(false)}
              onSwipeComplete={() => setInstrumentModalVisible(false)}
              style={{backgroundColor: theme.colors.surface}}>
              <MidiInstrumentsList
                onInstrumentSelect={(instrument, name) => {
                  handleSave([
                    {property: 'musicInstrumentName', value: name},
                    {property: 'musicInstrumentId', value: instrument},
                  ]);
                  setInstrumentModalVisible(false);
                }}
                modalClose={() => setInstrumentModalVisible(false)}
              />
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
