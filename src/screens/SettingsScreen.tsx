import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/types.ts';
import {Appbar, Switch, Text} from 'react-native-paper';
import {toggleTheme} from '../store/features/settingsSlice.ts';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../store/store.ts';
import {StyleSheet, View} from 'react-native';
import {darkTheme, lightTheme} from '../assets/styles/themes.ts';

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
    </View>
  ); // Your component JSX
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  configRow: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default SettingsScreen;
