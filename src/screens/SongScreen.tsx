import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/types.ts';
import {Appbar} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import NormalSongScreenComponent from '../components/songscreens/NormalSongScreenComponent.tsx';
import {useThemeSelection} from '../hooks/useThemeSelection.ts';

type Props = NativeStackScreenProps<RootStackParamList, 'SongScreen'>;

function SongScreen({navigation, route}: Props) {
  const theme = useThemeSelection();
  const {lied} = route.params;
  return (
    <View
      style={{...styles.container, backgroundColor: theme.colors.background}}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={lied.titel} />
      </Appbar.Header>
      <NormalSongScreenComponent lied={lied} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default SongScreen;
