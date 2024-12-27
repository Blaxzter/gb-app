import React, {useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/types.ts';
import {Appbar, Switch, Text} from 'react-native-paper';
import {
  setSongViewSettings,
  toggleTheme,
} from '../store/features/settingsSlice.ts';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../store/store.ts';
import {StyleSheet, View} from 'react-native';
import {darkTheme, lightTheme} from '../assets/styles/themes.ts';
import DropDown from '../components/bits/DropDown.tsx';
import {selectSongViewSettings} from '../hooks/useSettings.ts';

type Props = NativeStackScreenProps<RootStackParamList, 'SettingsScreen'>;

function SettingsScreen({navigation}: Props) {
  const theme = useSelector((state: RootState) =>
    state.settings.theme === 'light' ? lightTheme : darkTheme,
  );
  const isDarkTheme = useSelector(
    (state: RootState) => state.settings.theme === 'dark',
  );
  const dispatch: AppDispatch = useDispatch();

  const handleThemeChange = () => {
    dispatch(toggleTheme());
  };

  const [showViewDropDown, setShowViewDropDown] = useState(false);

  const displayMode = useSelector((state: RootState) =>
    selectSongViewSettings(state.settings),
  );
  const setDisplayMode = (
    mode: 'abcjs' | 'png' | 'transcribed' | 'localpng',
  ) => {
    dispatch(setSongViewSettings(mode));
  };

  const viewModeList = [
    {label: 'ABC Render', value: 'abcjs'},
    {label: 'PNG', value: 'png'},
    {label: 'Local PNG', value: 'localpng'},
  ];

  // UI for changing the theme
  return (
    <View
      style={{...styles.container, backgroundColor: theme.colors.background}}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Einstellungen" />
      </Appbar.Header>
      <View style={styles.configRow}>
        <Text variant="titleLarge">Dark Theme</Text>
        <Switch value={isDarkTheme} onValueChange={handleThemeChange} />
      </View>
      <View style={styles.fullWidthRow}>
        <DropDown
          label={'View Mode'}
          mode={'outlined'}
          visible={showViewDropDown}
          showDropDown={() => setShowViewDropDown(true)}
          onDismiss={() => setShowViewDropDown(false)}
          value={displayMode}
          setValue={setDisplayMode}
          list={viewModeList}
          dropDownStyle={{
            borderColor: theme.colors.onBackground,
          }}
        />
      </View>
    </View>
  ); // Your component JSX
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  configRow: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fullWidthRow: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});

export default SettingsScreen;
