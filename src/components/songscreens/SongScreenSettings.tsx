import React, {useState} from 'react';
import Modal from 'react-native-modal';
import {FAB, TextInput, Portal} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import {useThemeSelection} from '../../hooks/useThemeSelection.ts';
import BottomDrawer from '../bits/BottomDrawer.tsx';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store.ts';
import MidiInstrumentsList from './songsettingcomponents/MidiInstrumentsList.tsx';
import {
  makeSelectIndividualSongSetting,
  selectAbcExample,
} from '../../hooks/useSettings.ts';
import {useAppDispatch} from '../../store/hooks.ts';
import {
  saveIndividualSongSetting,
  setAbcExample,
} from '../../store/features/settingsSlice.ts';
import DropDown from '../bits/DropDown.tsx';

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
  const selectIndividualSongSetting = makeSelectIndividualSongSetting();
  const individualSongSetting = useSelector((state: RootState) =>
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

  const [instrumentModalVisible, setInstrumentModalVisible] =
    React.useState(false);

  const [showABCExampleDropdown, setShowABCExampleDropdown] = useState(false);

  const abcExample = useSelector((state: RootState) =>
    selectAbcExample(state.settings),
  );
  const handleSetAbcExample = (
    mode:
      | 'orig'
      | 'abcExample1'
      | 'abcWithText'
      | 'abcHappyBirthday'
      | 'exportStandAllein',
  ) => {
    dispatch(setAbcExample(mode));
  };

  const abcExampleViewMode = [
    {label: 'Original', value: 'orig'},
    {label: 'Example 1', value: 'abcExample1'},
    {label: 'With Text', value: 'abcWithText'},
    {label: 'Happy Birthday', value: 'abcHappyBirthday'},
    {label: 'Stand Allein', value: 'exportStandAllein'},
  ];

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
            value={individualSongSetting.musicInstrumentName}
            editable={false}
            mode={'outlined'}
            style={{
              marginBottom: 20,
            }}
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
          {/*// select instrument*/}

          <DropDown
            label={'ABC Example'}
            mode={'outlined'}
            visible={showABCExampleDropdown}
            showDropDown={() => setShowABCExampleDropdown(true)}
            onDismiss={() => setShowABCExampleDropdown(false)}
            value={abcExample}
            setValue={handleSetAbcExample}
            list={abcExampleViewMode}
            dropDownStyle={{
              borderColor: theme.colors.onBackground,
            }}
          />
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
    right: 10,
    bottom: 75,
  },
});

export default SongScreenSettings;
