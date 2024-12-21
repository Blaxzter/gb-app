import React from 'react';
import {useState} from 'react';

import _ from 'lodash';

import {View, StyleSheet, FlatList} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/types.ts';
import {TouchableRipple, Divider, Appbar} from 'react-native-paper';
import BottomDrawer from '../components/bits/BottomDrawer.tsx';
import {useAppSelector} from '../store/hooks.ts';
import LiedListEntry from '../components/songlistcomponents/LiedListEntry.tsx';
import {Gesangbuchlied} from '../types/modeltypes.ts';
import SongListSearchAppBar from '../components/songlistcomponents/SongListSearchAppBar.tsx';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../store/store.ts';
import {darkTheme, lightTheme} from '../assets/styles/themes.ts';
import {addSongsToPlaylists} from '../store/features/playlistSlice';
import SelectPlaylistComponent from '../components/playlistcomponents/SelectPlaylistComponent';

type Props = NativeStackScreenProps<RootStackParamList, 'SongListScreen'>;

function SongListScreen({navigation}: Props) {
  const theme = useSelector((state: RootState) =>
    state.settings.theme === 'light' ? lightTheme : darkTheme,
  );
  const [searchQuery, setSearchQuery] = useState('');
  // State to hold selected categories
  const [selectedCategories, setSelectedCategories] = useState<string>('');
  const [hasABC, setHasABC] = useState<boolean>(false);
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedSongs, setSelectedSongs] = useState<Set<string>>(new Set());
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();

  // Callback function to update selected categories
  const handleCategoriesChange = (newCategories: string) => {
    setSelectedCategories(newCategories);
  };

  const handleABCChange = (newHasABC: boolean) => {
    setHasABC(newHasABC);
  };

  const toggleSelectMode = () => {
    setIsSelectMode(!isSelectMode);
    setSelectedSongs(new Set());
  };

  const toggleSongSelection = (songId: string) => {
    setSelectedSongs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(songId)) {
        newSet.delete(songId);
      } else {
        newSet.add(songId);
      }
      if (newSet.size === 0) {
        setIsSelectMode(false);
      }
      return newSet;
    });
  };

  const handleAddToPlaylists = (selectedPlaylistIds: string[]) => {
    const selectedSongIds = Array.from(selectedSongs);
    dispatch(
      addSongsToPlaylists({
        playlistIds: selectedPlaylistIds,
        songIds: selectedSongIds,
      }),
    );
    setIsModalVisible(false);
    toggleSelectMode();
  };

  const renderSelectionHeader = () => (
    <Appbar.Header>
      <Appbar.Action icon="close" onPress={toggleSelectMode} />
      <Appbar.Content title={`${selectedSongs.size} ausgewählt`} />
      {selectedSongs.size > 0 && (
        <Appbar.Action
          icon="playlist-plus"
          onPress={() => setIsModalVisible(true)}
        />
      )}
    </Appbar.Header>
  );

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
        visible={isModalVisible}
        hideModal={() => setIsModalVisible(false)}
        theme={theme}>
        <SelectPlaylistComponent
          onCancel={() => setIsModalVisible(false)}
          onConfirm={handleAddToPlaylists}
        />
      </BottomDrawer>
      {isSelectMode ? (
        renderSelectionHeader()
      ) : (
        <SongListSearchAppBar
          amountOfSongs={filteredSongs?.length}
          searchQuery={searchQuery}
          onSearchQueryChange={handleSearchQueryChange}
          onCategoriesChange={handleCategoriesChange}
          onABCChange={handleABCChange}
        />
      )}
      <View>
        {data && (
          <FlatList
            data={filteredSongs}
            renderItem={({item, index}) => (
              <View>
                <TouchableRipple
                  style={styles.songListEntry}
                  onPress={() => {
                    if (isSelectMode) {
                      toggleSongSelection(item.id.toString());
                    } else {
                      navigation.navigate('SongScreen', {lied: item});
                    }
                  }}
                  onLongPress={() => {
                    if (!isSelectMode) {
                      setIsSelectMode(true);
                      toggleSongSelection(item.id.toString());
                    }
                  }}>
                  <LiedListEntry
                    lied={item}
                    index={index}
                    isSelectMode={isSelectMode}
                    isSelected={selectedSongs.has(item.id.toString())}
                  />
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
