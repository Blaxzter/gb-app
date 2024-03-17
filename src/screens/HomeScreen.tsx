// In App.js in a new project

import * as React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/types.ts';
import {ActivityIndicator, Button, Text, Appbar} from 'react-native-paper';
import {useAppSelector} from '../store/hooks.ts';
import {useEffect} from 'react';
import fetchGBData from '../store/queries/thunk.tsx';
import {useAppDispatch} from '../store/hooks.ts';
import {useSelector} from 'react-redux';
import {RootState} from '../store/store.ts';
import {darkTheme, lightTheme} from '../assets/styles/themes.ts';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

function HomeScreen({navigation}: Props) {
  const isDarkTheme = useSelector(
    (state: RootState) => state.settings.theme === 'dark',
  );
  const theme = useSelector((state: RootState) =>
    state.settings.theme === 'light' ? lightTheme : darkTheme,
  );

  const loading = useAppSelector(state => state.gbData.loading);
  const error = useAppSelector(state => state.gbData.error);
  const data = useAppSelector(state => state.gbData.data);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchGBData());
  }, [dispatch]);

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Gesangbuchlied" />
      </Appbar.Header>
      <View
        style={{...styles.container, backgroundColor: theme.colors.background}}>
        {isDarkTheme ? (
          <Image
            style={styles.logo}
            source={require('../assets/images/logo-dark.png')}
          />
        ) : (
          <Image
            style={styles.logo}
            source={require('../assets/images/logo-light.png')}
          />
        )}

        {loading === 'pending' && (
          <View style={styles.pending}>
            <Text style={styles.loadingText}>Fetching data from server...</Text>
            <ActivityIndicator size="large" />
          </View>
        )}
        {error && <Text>Error: {error}</Text>}
        {data.length > 0 && (
          <Button
            mode="outlined"
            icon={'book-open-variant'}
            onPress={() => navigation.navigate('SongListScreen')}>
            Gesangbuchlieder
          </Button>
        )}
        <Button
          mode="outlined"
          icon={'cog'}
          onPress={() => navigation.navigate('SettingsScreen')}>
          Einstellungen
        </Button>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    gap: 10,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
    alignSelf: 'center',
  },
  pending: {
    marginBottom: 30,
    alignItems: 'center',
  },
  loadingText: {
    marginBottom: 20,
    fontSize: 20,
    textAlign: 'center',
  },
});

export default HomeScreen;
