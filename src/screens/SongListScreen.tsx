import React from 'react';
import {useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/types.ts';
import {TouchableRipple, Divider} from 'react-native-paper';
import {useAppSelector} from '../store/hooks.ts';
import LiedListEntry from '../components/songlistcomponents/LiedListEntry.tsx';
import {Gesangbuchlied} from '../types/modeltypes.ts';
import SongListSearchAppBar from '../components/songlistcomponents/SongListSearchAppBar.tsx';
import {useSelector} from 'react-redux';
import {RootState} from '../store/store.ts';
import {darkTheme, lightTheme} from '../assets/styles/themes.ts';

type Props = NativeStackScreenProps<RootStackParamList, 'SongListScreen'>;

function SongListScreen({navigation}: Props) {
  const theme = useSelector((state: RootState) =>
    state.settings.theme === 'light' ? lightTheme : darkTheme,
  );
  const [searchQuery, setSearchQuery] = useState('');

  const data = useAppSelector(state => state.gbData.data);

  const filterSongs = (lied: Gesangbuchlied) => {
    const lowerCaseSearchQuery = searchQuery.toLowerCase();
    if (searchQuery === '') {
      return true;
    }
    return (
      lied?.titelLowerCase?.includes(lowerCaseSearchQuery) ||
      lied?.authorStrings?.includes(lowerCaseSearchQuery) ||
      lied?.kategorieStrings?.includes(lowerCaseSearchQuery)
    );
  };

  const handleSearchQueryChange = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <View
      style={{...styles.container, backgroundColor: theme.colors.background}}>
      <SongListSearchAppBar
        searchQuery={searchQuery}
        onSearchQueryChange={handleSearchQueryChange}
      />
      <View>
        {data && (
          <FlatList
            data={data.filter(lied => filterSongs(lied))}
            renderItem={({item, index}) => (
              <View>
                <TouchableRipple
                  style={styles.songListEntry}
                  onPress={() => {
                    navigation.navigate('SongScreen', {lied: item});
                  }}>
                  <LiedListEntry lied={item} index={index} />
                </TouchableRipple>
                <Divider horizontalInset />
              </View>
            )}
            keyExtractor={item => item.id.toString()}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  songListEntry: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    overflow: 'hidden',
  },
});

export default SongListScreen;
