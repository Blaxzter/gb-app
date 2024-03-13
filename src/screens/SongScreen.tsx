import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/types.tsx';
import {Text} from 'react-native-paper';

type Props = NativeStackScreenProps<RootStackParamList, 'SongScreen'>;

function SongScreen({navigation, route}: Props) {
  const {lied} = route.params;
  return (
    <>
      <Text>{JSON.stringify(lied)}</Text>
    </>
  );
}

export default SongScreen;
