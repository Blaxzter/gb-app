// In App.js in a new project

import * as React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/types.ts';
import {ActivityIndicator, Button, Text} from 'react-native-paper';
import {useAppSelector} from '../store/hooks.ts';
import {useEffect} from 'react';
import fetchGBData from '../store/queries/thunk.tsx';
import {useAppDispatch} from '../store/hooks.ts';
import {Gesangbuchlied} from '../types/modeltypes.ts';
import {useIsDarkTheme, useThemeSelection} from '../hooks/useThemeSelection.ts';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

function HomeScreen({navigation}: Props) {
  const dispatch = useAppDispatch();

  const theme = useThemeSelection();
  const isDarkTheme = useIsDarkTheme();

  const loading = useAppSelector(state => state.gbData.loading);
  const error = useAppSelector(state => state.gbData.error);
  const gbSongs: Gesangbuchlied[] = useAppSelector(state => state.gbData.data);

  useEffect(() => {
    if (gbSongs.length === 0) {
      dispatch(fetchGBData());
    }
  }, [dispatch, gbSongs]);

  return (
    <View
      style={{
        ...styles.wrapper,
        backgroundColor: theme.colors.background,
      }}>
      <Text variant={'displayLarge'} style={styles.headerText}>
        Digitales Gesangbuch
      </Text>
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

      <View style={styles.buttons}>
        {loading === 'pending' && (
          <View style={styles.pending}>
            <Text style={styles.loadingText}>Fetching data from server...</Text>
            <ActivityIndicator size="large" />
          </View>
        )}
        {error && <Text>Error: {error}</Text>}
        {gbSongs.length > 0 && (
          <Button
            mode="outlined"
            icon={'book-open-variant'}
            onPress={() => navigation.navigate('SongListScreen')}>
            Gesangbuchlieder
          </Button>
        )}
        <Button
          mode="outlined"
          icon={'playlist-music'}
          onPress={() => navigation.navigate('PlaylistScreen')}>
          Liedsammlungen
        </Button>
        <Button
          mode="outlined"
          icon={'cog'}
          onPress={() => navigation.navigate('SettingsScreen')}>
          Einstellungen
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    flexGrow: 1,
    padding: 20,
  },
  headerText: {
    marginTop: 50,
    marginBottom: 20,
    textAlign: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
    alignSelf: 'center',
  },
  buttons: {
    flex: 1,
    justifyContent: 'flex-end',
    gap: 10,
    paddingBottom: 50,
  },
  pending: {
    marginBottom: 30,
    alignItems: 'center',
  },
  spacer: {
    flex: 1,
    flexGrow: 1,
  },
  loadingText: {
    marginBottom: 20,
    fontSize: 20,
    textAlign: 'center',
  },
});

export default HomeScreen;
