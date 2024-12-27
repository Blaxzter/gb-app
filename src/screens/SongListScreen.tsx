import React from 'react';
import {useState} from 'react';

import _ from 'lodash';

import {View, StyleSheet, FlatList, Pressable} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/types.ts';
import {Divider} from 'react-native-paper';
import BottomDrawer from '../components/bits/BottomDrawer.tsx';
import {useAppSelector} from '../store/hooks.ts';
import LiedListEntry from '../components/songlistcomponents/LiedListEntry.tsx';
import {Gesangbuchlied} from '../types/modeltypes.ts';
import SongListSearchAppBar from '../components/songlistcomponents/SongListSearchAppBar.tsx';
import {useSelector} from 'react-redux';
import {RootState} from '../store/store.ts';
import {darkTheme, lightTheme} from '../assets/styles/themes.ts';
import SongMenuComponent from '../components/songlistcomponents/SongMenuComponent';

type Props = NativeStackScreenProps<RootStackParamList, 'SongListScreen'>;

function SongListScreen({navigation}: Props) {
  const theme = useSelector((state: RootState) =>
    state.settings.theme === 'light' ? lightTheme : darkTheme,
  );
  const [searchQuery, setSearchQuery] = useState('');
  // State to hold selected categories
  const [selectedCategories, setSelectedCategories] = useState<string>('');
  const [hasABC, setHasABC] = useState<boolean>(false);
  const [selectedSong, setSelectedSong] = useState<Gesangbuchlied | null>(null);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  // Callback function to update selected categories
  const handleCategoriesChange = (newCategories: string) => {
    setSelectedCategories(newCategories);
  };

  const handleABCChange = (newHasABC: boolean) => {
    setHasABC(newHasABC);
  };

  const showSongMenu = (song: Gesangbuchlied) => {
    setSelectedSong(song);
    setIsMenuVisible(true);
  };

  const data = useAppSelector(state => state.gbData.data);

  const filterSongs = (lied: Gesangbuchlied) => {
    if (hasABC && lied?.melodieId?.abc_melodie === null) {
      return false;
    }

    const lowerCaseSearchQuery = searchQuery.toLowerCase();
    if (selectedCategories === '' && searchQuery === '') {
      return true;
    }
    let category_split = selectedCategories.split(',');
    const isInSelectedCategories =
      selectedCategories === ''
        ? true
        : _.some(lied.kategorieId, kategorie =>
            category_split.includes(kategorie.kategorie_id.name?.toLowerCase()),
          );

    const searchQueryMatch =
      searchQuery === ''
        ? true
        : lied?.titelLowerCase?.includes(lowerCaseSearchQuery) ||
          lied?.authorStrings?.includes(lowerCaseSearchQuery) ||
          lied?.kategorieStrings?.includes(lowerCaseSearchQuery);

    return isInSelectedCategories && searchQueryMatch;
  };

  const handleSearchQueryChange = (query: string) => {
    setSearchQuery(query);
  };

  const filteredSongs = data?.filter(filterSongs);

  return (
    <View
      style={{...styles.container, backgroundColor: theme.colors.background}}>
      <BottomDrawer
        visible={isMenuVisible}
        hideModal={() => setIsMenuVisible(false)}
        theme={theme}>
        {selectedSong && (
          <SongMenuComponent
            song={selectedSong}
            onClose={() => setIsMenuVisible(false)}
            onNavigateToSong={() => {
              setIsMenuVisible(false);
              navigation.navigate('SongScreen', {lied: selectedSong});
            }}
          />
        )}
      </BottomDrawer>
      <SongListSearchAppBar
        amountOfSongs={filteredSongs?.length}
        searchQuery={searchQuery}
        onSearchQueryChange={handleSearchQueryChange}
        onCategoriesChange={handleCategoriesChange}
        onABCChange={handleABCChange}
      />
      <View>
        {data && (
          <FlatList
            data={filteredSongs}
            renderItem={({item, index}) => (
              <View>
                <Pressable
                  style={styles.songListEntry}
                  onPress={() =>
                    navigation.navigate('SongScreen', {lied: item})
                  }
                  android_ripple={{color: theme.colors.surfaceVariant}}
                  delayLongPress={200}
                  onLongPress={() => showSongMenu(item)}>
                  <LiedListEntry lied={item} index={index} />
                </Pressable>
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
  modal: {
    flex: 1,
    margin: 20,
    marginBottom: 80,
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
  },
});

export default SongListScreen;
