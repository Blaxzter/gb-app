// In App.js in a new project

import * as React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/types.tsx';
import {ActivityIndicator, Button, Text} from 'react-native-paper';
import {useAppSelector} from '../store/hooks';
import {useEffect} from 'react';
import fetchGBData from '../store/queries/thunk.tsx';
import {useAppDispatch} from '../store/hooks.tsx';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

function HomeScreen({navigation}: Props) {
  const loading = useAppSelector(state => state.gbData.loading);
  const error = useAppSelector(state => state.gbData.error);
  const data = useAppSelector(state => state.gbData.data);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchGBData());
  }, [dispatch]);

  return (
    <>
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require('../assets/images/logo.png')}
        />

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
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
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
